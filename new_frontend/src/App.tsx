import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';

import api from './services/api';

const App: React.FC = () => {
  // temp
  const token = localStorage.getItem('@Santiago:token');
  if (token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }

  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
