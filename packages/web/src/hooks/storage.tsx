import React, { createContext, useCallback, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Data {
  token: string;
  user: User;
}

interface StorageContext {
  user?: User;
  readData: () => Data | null;
  writeData: (data: Data) => void;
  clearData: () => void;
}

const value: StorageContext = {
  readData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
  
    if (token && user) {
      return {token, user: JSON.parse(user)};
    }
    return null;
  },
  
  writeData({token, user}: Data): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  clearData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

const Context = createContext<StorageContext | null>(value);

export function useStorage(): StorageContext {
  const context = useContext(Context);
  
  if (!context) {
    throw new Error('useStorage must be used within an StorageProvider');
  }

  return context;
}

export const StorageProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(value.readData()?.user);

  const writeData = useCallback((data: Data) => {
    value.writeData(data);
    setUser(data.user);
  }, []);

  const clearData = useCallback(() => {
    value.clearData();
    setUser(undefined);
  }, []);

  return (
    <Context.Provider value={{
      user,
      writeData,
      clearData,
      readData: value.readData,
    }}>
      {children}
    </Context.Provider>
  );
};
