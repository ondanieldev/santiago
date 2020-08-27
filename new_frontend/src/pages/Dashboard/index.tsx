import React from 'react';

import { Container, Main } from './style';
import Header from '../../components/Header';
import Aside from '../../components/Aside';

const Dashboard: React.FC = () => (
  <Container>
    <Header />
    <Aside />
    <Main>
      <h1>Dashboard</h1>
    </Main>
  </Container>
);

export default Dashboard;
