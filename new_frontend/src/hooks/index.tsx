import React from 'react';

import { AuthProvider } from './auth';
import { AsideProvider } from './aside';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AsideProvider>{children}</AsideProvider>
  </AuthProvider>
);

export default AppProvider;
