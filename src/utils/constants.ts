// API Configuration
export const API_BASE = 'https://dummyjson.com';

// App Configuration
export const CHOSEN_CATEGORY = 'smartphones';
export const SUPERADMIN_USERNAME = 'emilys'; // DummyJSON test user

// Auto-lock Configuration
export const AUTO_LOCK_TIMEOUT_MS = 10000; // 10 seconds

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth.token',
  AUTH_USER: 'auth.user',
  QUERY_CACHE: 'react-query-cache',
} as const;

// List Performance Configuration
export const LIST_CONFIG = {
  INITIAL_NUM_TO_RENDER: 10,
  MAX_TO_RENDER_PER_BATCH: 12,
  WINDOW_SIZE: 7,
  ITEM_HEIGHT: 80, // Fixed row height for getItemLayout
} as const;

// React Query Configuration
export const QUERY_CONFIG = {
  STALE_TIME: 60_000, // 1 minute
  GC_TIME: 5 * 60_000, // 5 minutes
  RETRY: 1,
} as const;
