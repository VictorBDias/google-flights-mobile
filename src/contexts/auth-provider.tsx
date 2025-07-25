import { useMutation } from '@tanstack/react-query';
import {
  type ReactNode,
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import type { AuthValidator, SignUpValidator } from '../validations/auth';
import { IUser } from '../models/user-DTO';
import { mmkvStorage } from '../storage/mmkvStorage';
import { signInAPi } from '@apis/auth/sign-in';
import { signUpApi } from '@apis/auth/sign-up';
import { mockGetCurrentUser } from '@services/mock-auth';

export const AuthContext = createContext<{
  login: any;
  signUp: any;
  isLogged: boolean;
  status: 'idle' | 'pending' | 'success' | 'error';
  error: Error | null;
  logout: () => void;
  user: IUser | null;
  isLoading: boolean;
} | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { getItem, containsItem, removeItem, setItem } = mmkvStorage;
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getItem('token');
        const userData = await getItem('user');

        if (token && userData && typeof userData === 'object') {
          setUser(userData as IUser);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear invalid data
        await removeItem('token');
        await removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const {
    mutateAsync: login,
    status,
    error,
  } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: AuthValidator) => {
      const { token, user: apiUser } = await signInAPi(data);
      await setItem('user', apiUser);
      await setItem('token', token);
      setUser(apiUser);
      return { token, user: apiUser };
    },
  });

  const {
    mutateAsync: signUp,
    status: signUpStatus,
    error: signUpError,
  } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignUpValidator) => {
      const { token, user: apiUser } = await signUpApi({
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await setItem('user', apiUser);
      await setItem('token', token);
      setUser(apiUser);
      return { token, user: apiUser };
    },
  });

  const logout = useCallback(async () => {
    await removeItem('user');
    await removeItem('token');
    setUser(null);
  }, []);

  // Simplified isLogged logic - just check if user exists
  const isLogged = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
        isLogged,
        status: status === 'pending' ? 'pending' : signUpStatus,
        error: error || signUpError,
        user,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
