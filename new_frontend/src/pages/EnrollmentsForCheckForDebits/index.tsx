import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Enrollments from '../../components/Enrollments';

const EnrollmentsForCheckForDebits: React.FC = () => (
  <Container>
    <Header />

    <Aside />

    <Main>
      <Title title="Pagar débitos" subtitle="Selecionar matrícula" />

      <Enrollments page="CheckForDebits" />
    </Main>
  </Container>
);

export default EnrollmentsForCheckForDebits;
