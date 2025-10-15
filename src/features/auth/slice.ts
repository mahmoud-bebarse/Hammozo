import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../utils/types';
import { STORAGE_KEYS, SUPERADMIN_USERNAME } from '../../utils/constants';
import { jsonStorage } from '../../services/storage';

const initialState: AuthState = {
  token: null,
  user: null,
  isSuperadmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isSuperadmin = action.payload.user.username === SUPERADMIN_USERNAME;

      // Persist to MMKV
      jsonStorage.set(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
      jsonStorage.set(STORAGE_KEYS.AUTH_USER, action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isSuperadmin = false;

      // Clear from MMKV
      jsonStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
      jsonStorage.remove(STORAGE_KEYS.AUTH_USER);
    },
    hydrateAuth: (state) => {
      const token = jsonStorage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
      const user = jsonStorage.get<User>(STORAGE_KEYS.AUTH_USER);

      if (token && user) {
        state.token = token;
        state.user = user;
        state.isSuperadmin = user.username === SUPERADMIN_USERNAME;
      }
    },
  },
});

export const { setCredentials, logout, hydrateAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
