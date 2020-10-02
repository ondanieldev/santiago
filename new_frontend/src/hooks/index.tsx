import React from 'react';

import { AuthProvider } from './auth';
import { ResponsiblesProvider } from './responsibles';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ResponsiblesProvider>{children}</ResponsiblesProvider>
  </AuthProvider>
);

export default AppProvider;
