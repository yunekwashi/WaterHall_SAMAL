import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';

/// The existing WebView photo channel's bounded, testable picker operation.
class ReportPhotoPicker {
  ReportPhotoPicker({required this.pickImage, required this.recoverImage});
  final Future<XFile?> Function(ImageSource source) pickImage;
  final Future<XFile?> Function() recoverImage;
  static const maxBytes = 2 * 1024 * 1024;

  Future<Map<String, String?>> pick(String source) async {
    try {
      final XFile? image;
      if (source == 'recover') {
        image = await recoverImage();
      } else if (source == 'camera' || source == 'gallery') {
        image = await pickImage(source == 'camera' ? ImageSource.camera : ImageSource.gallery);
      } else {
        return {'error': 'Choose a photo source and try again.'};
      }
      if (image == null) return {}; // Cancellation preserves the current draft.
      if (await image.length() > maxBytes) return {'error': 'Photo must be at most 2 MiB. Choose a smaller photo.'};
      final bytes = await image.readAsBytes();
      if (bytes.length > maxBytes) return {'error': 'Photo must be at most 2 MiB. Choose a smaller photo.'};
      // Picker MIME/name can describe the original rather than the resized file.
      String? mime;
      if (bytes.length >= 3 && bytes[0] == 255 && bytes[1] == 216 && bytes[2] == 255) mime = 'image/jpeg';
      if (bytes.length >= 8 && bytes.take(8).join(',') == '137,80,78,71,13,10,26,10') mime = 'image/png';
      if (bytes.length >= 12 && ascii.decode(bytes.sublist(0, 4), allowInvalid: true) == 'RIFF' &&
          ascii.decode(bytes.sublist(8, 12), allowInvalid: true) == 'WEBP') {
        mime = 'image/webp';
      }
      if (mime == null) return {'error': 'Use a JPEG, PNG or WebP photo.'};
      return {'data_url': 'data:$mime;base64,${base64Encode(bytes)}', 'file_name': image.name};
    } on PlatformException catch (error) {
      return {'error': switch (error.code) {
        'camera_access_denied' || 'camera_access_restricted' =>
          'Camera access was denied. Allow Camera in Android Settings, or choose Gallery.',
        'photo_access_denied' || 'photo_access_restricted' =>
          'Photo access was denied. Choose an accessible photo or review Android Settings.',
        'already_active' => 'A photo picker is already open. Finish or cancel it first.',
        'no_available_camera' => 'No camera is available. Choose Gallery instead.',
        _ => 'Could not load selected photo. Please try again.',
      }};
    } catch (_) {
      return {'error': 'Could not load selected photo. Please try again.'};
    }
  }
}
