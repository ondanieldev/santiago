import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import GradesList from '../../components/GradesList';

const ValidateEnrollmentsGradesMenu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Validar matrículas" subtitle="Selecione uma turma" />
        <GradesList toPageAfterSelect="/validate-enrollments/grades" />
      </Main>
    </Container>
  );
};

export default ValidateEnrollmentsGradesMenu;
