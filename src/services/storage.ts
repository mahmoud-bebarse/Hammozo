import { MMKV } from 'react-native-mmkv';

// Initialize MMKV instance
export const storage = new MMKV();

/**
 * MMKV storage wrapper with type-safe methods
 */
export const mmkvStorage = {
  setItem: (key: string, value: string): void => {
    storage.set(key, value);
  },
  getItem: (key: string): string | null => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string): void => {
    storage.delete(key);
  },
  clear: (): void => {
    storage.clearAll();
  },
};

/**
 * Type-safe JSON storage helpers
 */
export const jsonStorage = {
  set: <T>(key: string, value: T): void => {
    try {
      const jsonValue = JSON.stringify(value);
      storage.set(key, jsonValue);
    } catch (error) {
      console.error(`Error storing JSON for key "${key}":`, error);
    }
  },
  get: <T>(key: string): T | null => {
    try {
      const jsonValue = storage.getString(key);
      if (jsonValue === undefined) {
        return null;
      }
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
      return null;
    }
  },
  remove: (key: string): void => {
    storage.delete(key);
  },
};
