import 'dart:io';

void main() async {
  // Port to listen on
  const port = 8000;
  
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
      // Prevent directory traversal attacks
      String path = request.uri.path;
      if (path == '/' || path.isEmpty) {
        path = '/index.html';
      }
      
      // Standardize separators
      path = path.replaceAll('/', Platform.pathSeparator);
      
      final file = File('${webDir.path}$path');
      
      // Verify the file path is within the web directory (prevent traversal)
      final canonicalFilePath = file.absolute.path;
      final canonicalWebPath = webDir.absolute.path;
      
      if (!canonicalFilePath.startsWith(canonicalWebPath)) {
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
        final contentType = mimeTypes[ext] ?? 'application/octet-stream';
        
        request.response.headers
          ..set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
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
      print('Error processing request: $e');
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
