import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import GradesList from '../../components/GradesList';

const PayDebitsGradesMenu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Pagar débitos" subtitle="Selecione uma turma" />
        <GradesList toPageAfterSelect="/pay-debits/grades" />
      </Main>
    </Container>
  );
};

export default PayDebitsGradesMenu;
