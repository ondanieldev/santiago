import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Main } from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Enrollments from '../../components/Enrollments';

const UnderAnalysisAndPendentEnrollments: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Validar matrículas" />

        <Enrollments
          apiUrl="/contracts/under-analysis-pendent"
          handleSelectEnrollment={(id: string) => {
            history.push(`validate-enrollments/${id}`);
          }}
        />
      </Main>
    </Container>
  );
};

export default UnderAnalysisAndPendentEnrollments;
