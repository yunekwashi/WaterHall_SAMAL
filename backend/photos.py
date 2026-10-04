"""Validate/re-encode images; PostgreSQL or private S3, never ephemeral disk."""
import base64
import io
import os
import re
import uuid
import warnings

from flask import abort
from PIL import Image, ImageOps, UnidentifiedImageError

MAX_BYTES = 2 * 1024 * 1024
# Binary delivery avoids Base64 overhead and leaves margin below Vercel's 4.5 MB limit.
MAX_DELIVERY_BYTES = 3 * 1024 * 1024
Image.MAX_IMAGE_PIXELS = 12_000_000


def _s3():
    import boto3
    endpoint = os.getenv('S3_ENDPOINT_URL') or None
    if endpoint and not endpoint.startswith('https://'):
        raise RuntimeError('S3_ENDPOINT_URL must use HTTPS')
    return boto3.client('s3', region_name=os.getenv('S3_REGION') or None, endpoint_url=endpoint)


def save_photo(value):
    if value in (None, ''):
        return None
    if not isinstance(value, str) or len(value) > MAX_BYTES * 4 // 3 + 100:
        abort(413, description='Photo must be at most 2 MiB')
    try:
        if value.startswith('data:'):
            header, value = value.split(',', 1)
            if header not in ('data:image/jpeg;base64', 'data:image/png;base64', 'data:image/webp;base64'):
                raise ValueError()
        raw = base64.b64decode(value, validate=True)
        if len(raw) > MAX_BYTES:
            abort(413, description='Photo must be at most 2 MiB')
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(raw)) as original:
                if original.format not in ('JPEG', 'PNG', 'WEBP'):
                    raise ValueError()
                original.load()
                # Apply phone orientation before stripping EXIF from the stored JPEG.
                original = ImageOps.exif_transpose(original)
                original.thumbnail((1920, 1920))
                output = io.BytesIO()
                original.convert('RGB').save(output, format='JPEG', quality=85)
        image = output.getvalue()  # No executable payload, filenames, or EXIF metadata.
    except (ValueError, UnidentifiedImageError, OSError, Image.DecompressionBombError, Image.DecompressionBombWarning):
        abort(400, description='Invalid image; use JPEG, PNG or WebP')
    storage = os.getenv('PHOTO_STORAGE', 'database')
    if storage == 'database':
        return 'data:image/jpeg;base64,' + base64.b64encode(image).decode()
    if storage != 's3' or not os.getenv('S3_BUCKET'):
        raise RuntimeError('Configure PHOTO_STORAGE and S3_BUCKET')
    key = 'reports/' + uuid.uuid4().hex + '.jpg'
    _s3().put_object(Bucket=os.environ['S3_BUCKET'], Key=key, Body=image,
                     ContentType='image/jpeg', ServerSideEncryption='AES256')
    return 's3:' + key


def photo_for_client(value):
    if value and value.startswith('s3:'):
        return _s3().generate_presigned_url('get_object', Params={
            'Bucket': os.environ['S3_BUCKET'], 'Key': value[3:]}, ExpiresIn=300)
    return value


def report_photo_metadata(report):
    """Report lists never fetch image bytes or issue storage credentials."""
    report['has_photo'] = bool(report['has_photo'])
    report['photo_url'] = f"/api/reports/{report['report_id']}/photo" if report['has_photo'] else None
    report['photo_base64'] = None  # Retain the legacy key without the inline payload.
    return report


def read_report_photo(value):
    """Read one already-authorized persistent photo; never redirect to a public URL."""
    if not isinstance(value, str) or not value:
        abort(404, description='Report photo not found')
    if value.startswith('s3:'):
        if not re.fullmatch(r's3:reports/[0-9a-f]{32}\.jpg', value):
            abort(404, description='Invalid report photo reference')
        if not os.getenv('S3_BUCKET'):
            abort(503, description='Photo storage unavailable')
        from botocore.exceptions import ClientError
        try:
            stored = _s3().get_object(Bucket=os.environ['S3_BUCKET'], Key=value[3:])
            body = stored['Body']
            try:
                raw = body.read(MAX_DELIVERY_BYTES + 1)
            finally:
                body.close()
        except ClientError as error:
            if error.response.get('Error', {}).get('Code') in ('NoSuchKey', '404'):
                abort(404, description='Report photo not found')
            abort(503, description='Photo storage unavailable')
        except Exception:
            abort(503, description='Photo storage unavailable')
    else:
        if len(value) > MAX_DELIVERY_BYTES * 4 // 3 + 100:
            abort(413, description='Stored photo exceeds the safe delivery limit')
        try:
            if value.startswith('data:'):
                header, value = value.split(',', 1)
                if header not in ('data:image/jpeg;base64', 'data:image/png;base64', 'data:image/webp;base64'):
                    raise ValueError()
            raw = base64.b64decode(value, validate=True)
        except (ValueError, TypeError):
            abort(404, description='Invalid report photo reference')
    if len(raw) > MAX_DELIVERY_BYTES:
        abort(413, description='Stored photo exceeds the safe delivery limit')
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(raw)) as image:
                mime = {'JPEG': 'image/jpeg', 'PNG': 'image/png', 'WEBP': 'image/webp'}.get(image.format)
                if not mime:
                    raise ValueError()
                image.load()
    except (ValueError, UnidentifiedImageError, OSError, Image.DecompressionBombError, Image.DecompressionBombWarning):
        abort(404, description='Invalid report photo reference')
    return raw, mime
