import { httpClient } from '../../services/http';
import {
  LoginRequest,
  LoginResponse,
  LoginResponseSchema,
  User,
  UserSchema,
} from '../../utils/types';

/**
 * Login with username and password
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>('/auth/login', credentials);

  // Validate response with Zod in development
  if (__DEV__) {
    LoginResponseSchema.parse(response.data);
  }

  return response.data;
};

/**
 * Get current user details (validates token)
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await httpClient.get<User>('/auth/me');

  // Validate response with Zod in development
  if (__DEV__) {
    UserSchema.parse(response.data);
  }

  return response.data;
};
