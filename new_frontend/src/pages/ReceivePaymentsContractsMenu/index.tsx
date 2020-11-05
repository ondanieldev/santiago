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

const ReceivePaymentsMenu: React.FC = () => {
  const history = useHistory();
  const { grade_id } = useParams<IParams>();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Receber pagamentos" subtitle="Selecionar matrícula" />

        <Enrollments
          showSearch
          apiUrl={`/contracts/accepted-active/grades/${grade_id}`}
          handleSelectEnrollment={(id: string) => {
            history.push(`/receive-payments/contracts/${id}`);
          }}
        />
      </Main>
    </Container>
  );
};

export default ReceivePaymentsMenu;
