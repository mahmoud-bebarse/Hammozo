import { authReducer, setCredentials, logout } from '../../src/features/auth/slice';
import { AuthState, User } from '../../src/utils/types';

describe('auth slice', () => {
  const initialState: AuthState = {
    token: null,
    user: null,
    isSuperadmin: false,
  };

  const mockUser: User = {
    id: 1,
    username: 'emilys',
    email: 'emily@example.com',
    firstName: 'Emily',
    lastName: 'Smith',
    gender: 'female',
    image: 'https://example.com/image.jpg',
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const actual = authReducer(
      initialState,
      setCredentials({ token: 'test-token', user: mockUser })
    );
    expect(actual.token).toBe('test-token');
    expect(actual.user).toEqual(mockUser);
    expect(actual.isSuperadmin).toBe(true); // emilys is superadmin
  });

  it('should handle setCredentials for non-superadmin', () => {
    const regularUser = { ...mockUser, username: 'regular' };
    const actual = authReducer(
      initialState,
      setCredentials({ token: 'test-token', user: regularUser })
    );
    expect(actual.isSuperadmin).toBe(false);
  });

  it('should handle logout', () => {
    const stateWithAuth: AuthState = {
      token: 'test-token',
      user: mockUser,
      isSuperadmin: true,
    };
    const actual = authReducer(stateWithAuth, logout());
    expect(actual).toEqual(initialState);
  });
});
