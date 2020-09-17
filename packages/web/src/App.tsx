import React from 'react';
import { AuthProvider } from './hooks/auth';
import { StorageProvider } from './hooks/storage';

import Routes from './routes';

function App() {
  return (
    <div className="App">
      <StorageProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </StorageProvider>
    </div>
  );
}

export default App;
