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

const ExtraDebitsContractsMenu: React.FC = () => {
  const history = useHistory();
  const { grade_id } = useParams<IParams>();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title
          title="Gerenciar débitos adicionais"
          subtitle="Selecione uma matrícula"
        />

        <Enrollments
          apiUrl={`/contracts/active/grades/${grade_id}`}
          handleSelectEnrollment={(id: string) => {
            history.push(`/extra-debits/contracts/${id}`);
          }}
          searchApiUrl={`/contracts/active/students/${grade_id}`}
          showSearch
        />
      </Main>
    </Container>
  );
};

export default ExtraDebitsContractsMenu;
