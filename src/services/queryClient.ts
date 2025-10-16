import { QueryClient } from '@tanstack/react-query';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { QUERY_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { asyncMmkvStorage } from './storage';

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
 * Implements the Persister interface required by PersistQueryClientProvider
 */
export const queryPersister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await asyncMmkvStorage.setItem(
      STORAGE_KEYS.QUERY_CACHE,
      JSON.stringify(client)
    );
  },
  restoreClient: async () => {
    const stored = await asyncMmkvStorage.getItem(STORAGE_KEYS.QUERY_CACHE);
    if (!stored) {
      return undefined;
    }
    return JSON.parse(stored) as PersistedClient;
  },
  removeClient: async () => {
    await asyncMmkvStorage.removeItem(STORAGE_KEYS.QUERY_CACHE);
  },
};
