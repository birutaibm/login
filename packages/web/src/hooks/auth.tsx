import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInInputDTO {
  uid: string;
  password: string;
}

type SignInOutputDTO = Promise<void>;

interface AuthContext {
  user?: User;
  signIn(input: SignInInputDTO): SignInOutputDTO;
  signOut(): void;
  updateUser(user: User): void;
}

const Context = createContext<AuthContext | null>(null);

export function useAuth(): AuthContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState | null>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {token, user: JSON.parse(user)};
    } else {
      return null;
    }
  });

  const signIn = useCallback(async ({uid, password}) => {
    const {data} = await api.post('login', {uid, password});

    const {token, user} = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({token, user});
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setData(null);
  }, []);

  const updateUser = useCallback((user: User) => {
    const token = data?.token || '';
    localStorage.setItem('user', JSON.stringify(user));
    setData({
      token,
      user,
    });
  }, [setData, data]);

  const value = useMemo(() =>
    Object.assign({ signIn, signOut, updateUser }, data ? { user: data.user }: {}),
    [data, signIn, signOut, updateUser]
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
