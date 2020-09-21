import React from 'react';

import AppContext from './hooks';
import Routes from './routes';

function App() {
  return (
    <AppContext>
      <Routes />
    </AppContext>
  );
}

export default App;
