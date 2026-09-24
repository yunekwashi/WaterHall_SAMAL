"""Validate/re-encode images; PostgreSQL or private S3, never ephemeral disk."""
import base64
import io
import os
import uuid
import warnings

from flask import abort
from PIL import Image, UnidentifiedImageError

MAX_BYTES = 2 * 1024 * 1024
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
