import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import IContract from '../../entities/IContract';
import Table from '../Table';
import Pagination from '../Pagination';

interface IProps {
  page: 'AprooveOrDisaproove' | 'CheckForDebits';
}

const Enrollments: React.FC<IProps> = ({ page }) => {
  const history = useHistory();

  const [enrollments, setEnrollments] = useState([] as IContract[]);
  const [paginationPagesNumber, setPaginationPagesNumber] = useState(0);
  const [paginationActivePage, setPaginationActivePage] = useState(1);

  const handleLoadEnrollments = useCallback(
    (selectedPage: number) => {
      const limitPerPage = 10;

      api
        .get(
          `/enrollments?debitsOrValidate=${page}&limit=${limitPerPage}&page=${selectedPage}`,
        )
        .then(response => {
          setEnrollments(response.data.enrollments);
          setPaginationPagesNumber(response.data.pagination);
          setPaginationActivePage(selectedPage);
        });
    },
    [page],
  );

  useEffect(() => {
    handleLoadEnrollments(1);
  }, [handleLoadEnrollments]);

  const formatStatus = useCallback(
    (status: 'underAnalysis' | 'pendent' | 'accepted' | 'active') => {
      switch (status) {
        case 'underAnalysis':
          return 'Em análise';
        case 'pendent':
          return 'Pendente';
        case 'accepted':
          return 'Aceito';
        case 'active':
          return 'Ativo';
        default:
          return '-';
      }
    },
    [],
  );

  const handleSelectEnrollment = useCallback(
    (id: string) => {
      if (page === 'AprooveOrDisaproove') {
        history.push(`/enrollments/${id}`);
      } else {
        history.push(`/debits/${id}`);
      }
    },
    [page, history],
  );

  return (
    <>
      <Table
        isVoid={enrollments.length <= 0}
        voidMessage={
          page === 'AprooveOrDisaproove'
            ? 'Não há matrículas para serem validadas!'
            : 'Não há matrículas para serem selecionadas!'
        }
      >
        <thead>
          <tr>
            <td>#</td>
            <td>Status</td>
            <td>Aluno</td>
            <td>Turma</td>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr
              key={enrollment.id}
              onClick={() => handleSelectEnrollment(enrollment.id)}
            >
              <td>{enrollment.id}</td>
              <td>{formatStatus(enrollment.status)}</td>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.grade.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {paginationPagesNumber > 0 && (
        <Pagination
          pagesNumber={paginationPagesNumber}
          activePage={paginationActivePage}
          changePageEffect={selectedPage => handleLoadEnrollments(selectedPage)}
        />
      )}
    </>
  );
};

export default Enrollments;
