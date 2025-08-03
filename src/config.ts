const isProd = process.env.NODE_ENV === 'production';

export const API_URL = isProd
  ? process.env.NEXT_PUBLIC_API_URL || ''
  : process.env.NEXT_PUBLIC_DEV_URL || '';