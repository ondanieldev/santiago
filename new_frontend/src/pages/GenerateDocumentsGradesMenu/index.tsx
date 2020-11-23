import React from 'react';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import GradesList from '../../components/GradesList';

const GenerateDocumentGradesMenu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Gerar documentos" subtitle="Selecione uma turma" />
        <GradesList toPageAfterSelect="/generate-documents/grades" />
      </Main>
    </Container>
  );
};

export default GenerateDocumentGradesMenu;
