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

const PayDebitsContractsMenu: React.FC = () => {
  const history = useHistory();
  const { grade_id } = useParams<IParams>();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Pagar débitos" subtitle="Selecionar matrícula" />

        <Enrollments
          apiUrl={`/contracts/accepted-active/grades/${grade_id}`}
          handleSelectEnrollment={(id: string) => {
            history.push(`/pay-debits/contracts/${id}`);
          }}
          searchApiUrl={`/contracts/accepted-active/students/${grade_id}`}
          showSearch
        />
      </Main>
    </Container>
  );
};

export default PayDebitsContractsMenu;
