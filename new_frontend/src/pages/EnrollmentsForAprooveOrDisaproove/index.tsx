import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Enrollments from '../../components/Enrollments';

const EnrollmentsForAprooveOrDisaproove: React.FC = () => (
  <Container>
    <Header />

    <Aside />

    <Main>
      <Title title="Validar matrículas" />

      <Enrollments page="AprooveOrDisaproove" />
    </Main>
  </Container>
);

export default EnrollmentsForAprooveOrDisaproove;
