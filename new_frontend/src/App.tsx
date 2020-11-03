import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
