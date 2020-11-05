import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Container, GradesContainer } from './styles';
import Loading from '../Loading';
import IGrade from '../../entities/IGrade';
import api from '../../services/api';

interface IProps {
  toPageAfterSelect: string;
}

const GradesList: React.FC<IProps> = ({ toPageAfterSelect }) => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [grades, setGrades] = useState<IGrade[]>([]);

  useEffect(() => {
    api
      .get('/grades')
      .then(response => {
        const gradesFromApi = response.data as IGrade[];

        setGrades(gradesFromApi);
      })
      .catch(() => {
        toast.error(
          'Erro ao carregar dados doservidor! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  return (
    <Container>
      <Loading show={loadingPage} />

      <GradesContainer>
        {grades.map(grade => (
          <Link to={`${toPageAfterSelect}/${grade.id}`} key={grade.id}>
            {`${grade.name} - ${grade.year}`}
          </Link>
        ))}
      </GradesContainer>
    </Container>
  );
};

export default GradesList;
