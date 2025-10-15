import { useEffect, useRef, useState, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AUTO_LOCK_TIMEOUT_MS } from '../../utils/constants';

export interface AutoLockState {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
  resetTimer: () => void;
}

/**
 * Hook to manage auto-lock functionality
 * Locks after inactivity timeout or when app goes to background
 */
export const useAutoLock = (enabled: boolean = true): AutoLockState => {
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (enabled && !isLocked) {
      timerRef.current = setTimeout(() => {
        setIsLocked(true);
      }, AUTO_LOCK_TIMEOUT_MS);
    }
  }, [enabled, isLocked, clearTimer]);

  const resetTimer = useCallback(() => {
    if (!isLocked && enabled) {
      startTimer();
    }
  }, [isLocked, enabled, startTimer]);

  const lock = useCallback(() => {
    clearTimer();
    setIsLocked(true);
  }, [clearTimer]);

  const unlock = useCallback(() => {
    setIsLocked(false);
    startTimer();
  }, [startTimer]);

  // Handle AppState changes
  useEffect(() => {
    if (!enabled) return;

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/active/) &&
          nextAppState.match(/inactive|background/)
        ) {
          // App is going to background, lock immediately
          lock();
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [enabled, lock]);

  // Start timer when enabled
  useEffect(() => {
    if (enabled && !isLocked) {
      startTimer();
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [enabled, isLocked, startTimer, clearTimer]);

  return {
    isLocked,
    lock,
    unlock,
    resetTimer,
  };
};
