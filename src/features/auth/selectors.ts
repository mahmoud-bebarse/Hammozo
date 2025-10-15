import { RootState } from './store';

export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsSuperadmin = (state: RootState) => state.auth.isSuperadmin;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
