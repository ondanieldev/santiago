import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import GradesList from '../../components/GradesList';

const ExtraDebitsGradesMenu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title
          title="Gerenciar débitos adicionais"
          subtitle="Selecione uma turma"
        />
        <GradesList toPageAfterSelect="/extra-debits/grades" />
      </Main>
    </Container>
  );
};

export default ExtraDebitsGradesMenu;
