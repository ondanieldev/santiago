import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Enrollments from '../../components/Enrollments';

const AcceptedAndActiveEnrollments: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Pagar débitos" subtitle="Selecionar matrícula" />

        <Enrollments
          showSearch
          apiUrl="/contracts/accepted-active"
          handleSelectEnrollment={(id: string) => {
            history.push(`debits/${id}`);
          }}
        />
      </Main>
    </Container>
  );
};

export default AcceptedAndActiveEnrollments;
