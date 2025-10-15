import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { AppDispatch } from './store';
import { hydrateAuth, logout as logoutAction, setCredentials } from './slice';
import {
  selectIsAuthenticated,
  selectIsSuperadmin,
  selectToken,
  selectUser,
} from './selectors';
import { getCurrentUser, login as loginApi } from './api';
import { LoginRequest, User } from '../../utils/types';

/**
 * Hook to access auth state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isSuperadmin = useSelector(selectIsSuperadmin);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const userPayload: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };
      dispatch(setCredentials({ token: data.accessToken, user: userPayload }));
    },
  });

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    isAuthenticated,
    token,
    user,
    isSuperadmin,
    login: (credentials: LoginRequest) => loginMutation.mutateAsync(credentials),
    logout,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
};

/**
 * Hook to restore session on app launch
 */
export const useRestoreSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isRestoring, setIsRestoring] = useState(true);
  const [shouldShowLock, setShouldShowLock] = useState(false);
  const token = useSelector(selectToken);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Hydrate auth from MMKV
        dispatch(hydrateAuth());

        // If token exists, validate it
        if (token) {
          try {
            await getCurrentUser();
            // Token is valid, show lock screen
            setShouldShowLock(true);
          } catch {
            // Token is invalid, logout
            dispatch(logoutAction());
          }
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [dispatch, token]);

  return {
    isRestoring,
    shouldShowLock,
    dismissLock: () => setShouldShowLock(false),
  };
};
