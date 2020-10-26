import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Container } from './styles';
import Table from '../Table';
import Input from '../Input';
import Button from '../Button';
import Loading from '../Loading';
import api from '../../services/api';

interface IProps {
  apiUrl: string;
  handleSelectEnrollment(id: string): void;
  showSearch?: boolean;
}

interface IEnrollment {
  id: string;
  status: 'accepted' | 'active' | 'underAnalysis' | 'pendent';
  student: {
    name: string;
  };
  grade: {
    name: string;
    year: string;
  };
}

interface IFormData {
  student_name: string;
}

const Enrollments: React.FC<IProps> = ({
  apiUrl,
  handleSelectEnrollment,
  showSearch,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [enrollments, setEnrollments] = useState([] as IEnrollment[]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    setLoadingPage(true);

    api
      .get(apiUrl)
      .then(response => {
        setEnrollments(response.data || []);
      })
      .catch(() => {
        toast.error(
          'Erro ao buscar matrículas! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [apiUrl]);

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

  const handleSubmitForm = useCallback(
    async ({ student_name }: IFormData) => {
      setLoadingSearch(true);

      try {
        const response = await api.get(`/contracts/students/${student_name}`);
        setEnrollments(response.data);
      } catch {
        api.get(apiUrl).then(response => {
          setEnrollments(response.data || []);
        });
      } finally {
        setLoadingSearch(false);
      }
    },
    [apiUrl],
  );

  return (
    <Container>
      <Loading show={loadingPage} />

      {showSearch && (
        <Form onSubmit={handleSubmitForm} ref={formRef}>
          <Input
            name="student_name"
            placeholder="Pesquisar por nome do aluno"
          />

          <Button type="submit" loading={loadingSearch}>
            Pesquisar
          </Button>
        </Form>
      )}

      <Table
        isVoid={enrollments.length <= 0}
        voidMessage="Não há matrículas nesta seção!"
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
    </Container>
  );
};

export default Enrollments;
