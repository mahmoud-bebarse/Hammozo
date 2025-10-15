import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/react-query-persist-client';
import { QUERY_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { mmkvStorage } from './storage';

/**
 * React Query client with optimized defaults
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      gcTime: QUERY_CONFIG.GC_TIME,
      retry: QUERY_CONFIG.RETRY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: QUERY_CONFIG.RETRY,
    },
  },
});

/**
 * MMKV-based persister for React Query cache
 */
export const queryPersister = createSyncStoragePersister({
  storage: mmkvStorage,
  key: STORAGE_KEYS.QUERY_CACHE,
});
