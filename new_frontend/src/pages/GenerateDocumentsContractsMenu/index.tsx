import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Enrollments from '../../components/Enrollments';

interface IParams {
  grade_id: string;
}

const GenerateDocumentContractsMenu: React.FC = () => {
  const history = useHistory();
  const { grade_id } = useParams<IParams>();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Gerar documentos" subtitle="Selecionar matrícula" />

        <Enrollments
          apiUrl={`/contracts/active/grades/${grade_id}`}
          handleSelectEnrollment={(id: string) => {
            history.push(`/generate-documents/contracts/${id}`);
          }}
          searchApiUrl={`/contracts/active/students/${grade_id}`}
          showSearch
        />
      </Main>
    </Container>
  );
};

export default GenerateDocumentContractsMenu;
