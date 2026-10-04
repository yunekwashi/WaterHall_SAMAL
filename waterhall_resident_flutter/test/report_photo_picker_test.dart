import 'dart:async';
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:image_picker/image_picker.dart';
import 'package:waterhall_flutter/report_photo_picker.dart';

void main() {
  final png = base64Decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1sAAAAASUVORK5CYII=');
  for (final source in ['camera', 'gallery']) {
    test('$source launches the requested source and returns image bytes', () async {
      ImageSource? launched;
      final picker = ReportPhotoPicker(pickImage: (value) async {
        launched = value;
        return XFile.fromData(png, path: 'evidence.jpg', mimeType: 'image/jpeg');
      }, recoverImage: () async => null);
      final result = await picker.pick(source);
      expect(launched, source == 'camera' ? ImageSource.camera : ImageSource.gallery);
      expect(result['data_url'], 'data:image/png;base64,${base64Encode(png)}');
      expect(result['file_name'], 'evidence.jpg');
    });
    test('$source cancellation returns no image or error', () async {
      final picker = ReportPhotoPicker(pickImage: (_) async => null, recoverImage: () async => null);
      expect(await picker.pick(source), isEmpty);
    });
  }
  for (final code in ['camera_access_denied', 'photo_access_denied', 'already_active', 'no_available_camera']) {
    test('$code yields actionable bounded feedback', () async {
      final picker = ReportPhotoPicker(pickImage: (_) async => throw PlatformException(code: code),
          recoverImage: () async => null);
      final result = await picker.pick('camera');
      expect(result['error'], isNotEmpty);
      expect(result.containsKey('data_url'), isFalse);
      if (code.contains('denied')) expect(result['error'], contains('Settings'));
    });
  }
  test('unsupported and empty images are rejected', () async {
    for (final bytes in [Uint8List(0), Uint8List.fromList(utf8.encode('<svg/>'))]) {
      final picker = ReportPhotoPicker(pickImage: (_) async => XFile.fromData(bytes, name: 'test.png'),
          recoverImage: () async => null);
      expect((await picker.pick('gallery'))['error'], contains('JPEG'));
    }
  });
  test('oversized image is rejected before bridge transfer', () async {
    final picker = ReportPhotoPicker(pickImage: (_) async => XFile.fromData(Uint8List(ReportPhotoPicker.maxBytes + 1)),
        recoverImage: () async => null);
    expect((await picker.pick('camera'))['error'], contains('2 MiB'));
  });
  test('Android lost picker data can be recovered', () async {
    final picker = ReportPhotoPicker(pickImage: (_) => throw StateError('must not launch'),
        recoverImage: () async => XFile.fromData(png, path: 'recovered.png'));
    expect((await picker.pick('recover'))['file_name'], 'recovered.png');
  });
  test('unknown source never launches a picker', () async {
    final picker = ReportPhotoPicker(pickImage: (_) => throw StateError('must not launch'),
        recoverImage: () => throw StateError('must not recover'));
    expect((await picker.pick('invalid'))['error'], isNotEmpty);
  });
  test('delayed result completes only after picker returns', () async {
    final selected = Completer<XFile?>();
    final picker = ReportPhotoPicker(pickImage: (_) => selected.future, recoverImage: () async => null);
    final pending = picker.pick('camera');
    selected.complete(XFile.fromData(png, path: 'delayed.png'));
    expect((await pending)['file_name'], 'delayed.png');
  });
}
