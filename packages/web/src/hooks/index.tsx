import React from 'react';
import { AuthProvider } from './auth';
import { StorageProvider } from './storage';

const AppContext: React.FC = ({ children }) => {
  return (
    <StorageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </StorageProvider>
  );
}

export default AppContext;