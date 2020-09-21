import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

import api from '../services/api';
import { useStorage } from './storage';

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
  const storage = useStorage();
  const [data, setData] = useState<AuthState | null>(null);

  useEffect(() => {
    const data = storage.readData();
    if (data) {
      setData(data);
      api.defaults.headers.authorization = `Bearer ${data.token}`;
    }
    api.interceptors.response.use(response => response, error => {
      if (401 === error.response.status) {
        storage.clearData();
      }
    });
  }, [storage]);

  const signIn = useCallback(async ({uid, password}) => {
    const {data} = await api.post('login', {uid, password});

    storage.writeData(data);

    api.defaults.headers.authorization = `Bearer ${data.token}`;

    setData(data);
  }, [storage]);

  const signOut = useCallback(() => {
    api.delete('login');

    storage.clearData();

    setData(null);
  }, [storage]);

  const updateUser = useCallback((user: User) => {
    const token = data?.token || '';

    storage.writeData({ token, user });
    setData({
      token,
      user,
    });
  }, [setData, data, storage]);

  return (
    <Context.Provider value={{ signIn, signOut, updateUser }}>
      {children}
    </Context.Provider>
  );
};
