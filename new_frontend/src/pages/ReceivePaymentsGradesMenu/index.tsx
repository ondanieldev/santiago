import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import GradesList from '../../components/GradesList';

const ReceivePaymentsGradesMenu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Receber pagamentos" subtitle="Selecione uma turma" />
        <GradesList toPageAfterSelect="/receive-payments/grades" />
      </Main>
    </Container>
  );
};

export default ReceivePaymentsGradesMenu;
