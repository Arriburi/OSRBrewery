export const STORAGE_CONFIG = {
  BUCKET_NAME: 'images',
  PUBLIC: true,
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  FILE_SIZE_LIMIT: '5MB'
} as const; 