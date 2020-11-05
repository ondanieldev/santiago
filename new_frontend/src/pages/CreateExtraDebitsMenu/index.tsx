import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import GradesList from '../../components/GradesList';
import Title from '../../components/Title';

const CreateExtraDebitMenu: React.FC = () => (
  <Container>
    <Header />

    <Aside />

    <Main>
      <Title title="Criar débitos adicionais" subtitle="Selecione uma turma" />
      <GradesList toPageAfterSelect="/create-extra-debits" />
    </Main>
  </Container>
);

export default CreateExtraDebitMenu;
