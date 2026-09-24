import 'dart:io';

void main() async {
  // Local static preview only. Run the Flask server for the complete system.
  final port = int.parse(Platform.environment['PORT'] ?? '8000');
  
  // Base path of the static files (web directory next to bin)
  final scriptDir = File(Platform.script.toFilePath()).parent;
  final webDir = Directory('${scriptDir.parent.path}/web');
  
  final server = await HttpServer.bind(InternetAddress.loopbackIPv4, port);
  print('WaterHall server running at http://localhost:$port/');
  print('Serving files from: ${webDir.path}');
  
  final mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  
  await for (HttpRequest request in server) {
    try {
      // Reject decoded path traversal and Windows separator/drive variants.
      String path = request.uri.path;
      if (!['GET', 'HEAD'].contains(request.method) || request.uri.pathSegments.any((part) =>
          part == '..' || part.contains('\\') || part.contains(':') || part.contains('\u0000'))) {
        request.response.statusCode = HttpStatus.forbidden;
        await request.response.close();
        continue;
      }
      if (path == '/' || path.isEmpty) {
        path = '/index.html';
      }
      
      // Standardize separators
      path = path.replaceAll('/', Platform.pathSeparator);
      
      final file = File('${webDir.path}$path');
      
      // Verify the file path is within the web directory (prevent traversal)
      if (!await file.exists()) {
        request.response.statusCode = HttpStatus.notFound;
        await request.response.close();
        continue;
      }
      final canonicalFilePath = (await file.resolveSymbolicLinks()).toLowerCase();
      final canonicalWebPath = (await webDir.resolveSymbolicLinks()).toLowerCase();
      
      if (!canonicalFilePath.startsWith('$canonicalWebPath${Platform.pathSeparator}')) {
        request.response
          ..statusCode = HttpStatus.forbidden
          ..headers.contentType = ContentType.text
          ..write('Forbidden: Access Denied')
          ..close();
        continue;
      }
      
      if (await file.exists()) {
        final lastDot = file.path.lastIndexOf('.');
        final ext = lastDot != -1 ? file.path.substring(lastDot).toLowerCase() : '';
        final contentType = mimeTypes[ext];
        if (contentType == null) {
          request.response.statusCode = HttpStatus.notFound;
          await request.response.close();
          continue;
        }
        
        request.response.headers
          ..set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
          ..set('X-Content-Type-Options', 'nosniff')
          ..set('Content-Type', '$contentType; charset=utf-8');
          
        await file.openRead().pipe(request.response);
      } else {
        request.response
          ..statusCode = HttpStatus.notFound
          ..headers.contentType = ContentType.text
          ..write('404 Not Found: ${request.uri.path}')
          ..close();
      }
    } catch (e) {
      print('Static preview request failed: ${e.runtimeType}');
      try {
        request.response
          ..statusCode = HttpStatus.internalServerError
          ..headers.contentType = ContentType.text
          ..write('500 Internal Server Error')
          ..close();
      } catch (_) {}
    }
  }
}
