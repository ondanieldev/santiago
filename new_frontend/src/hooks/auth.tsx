import React, { createContext, useCallback, useState, useContext } from 'react';

import IUser from '../entities/IUser';
import api from '../services/api';

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Santiago:token');
    const user = localStorage.getItem('@Santiago:user');

    if (token && user) {
      api.defaults.headers.athorization = `bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        username,
        password,
      });

      localStorage.setItem('@Santiago:token', response.data.token);
      localStorage.setItem(
        '@Santiago:user',
        JSON.stringify(response.data.user),
      );

      api.defaults.headers.authorization = `bearer ${response.data.token}`;

      setData(response.data);
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Santiago:token');
    localStorage.removeItem('@Santiago:user');

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContext Provider');
  }

  return context;
};
