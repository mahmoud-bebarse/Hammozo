import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE } from '../utils/constants';
import { store } from '../features/auth/store';
import { logout } from '../features/auth/slice';

/**
 * Axios instance configured with base URL and interceptors
 */
export const httpClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to attach auth token
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle 401 errors
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired, logout user
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

/**
 * HTTP error handler utility
 */
export const handleHttpError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
      // Request made but no response
      return 'Network error. Please check your connection.';
    }
  }
  return 'An unexpected error occurred';
};
