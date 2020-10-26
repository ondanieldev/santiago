import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiInfo, FiCalendar, FiDollarSign, FiEdit2 } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import { Container, Main, ButtonGroup, DoubleColumn } from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GradesList from '../../components/List';
import IGrade from '../../entities/IGrade';
import api from '../../services/api';
import gradeSchema from '../../schemas/gradeSchema';
import getValidationErrors from '../../utils/getValidationErrors';

const Users: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [grades, setGrades] = useState([] as IGrade[]);
  const [gradeId, setGradeId] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get('/grades')
      .then(response => setGrades(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carregar turmas! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const handleGetGrade = useCallback((data: IGrade) => {
    setGradeId(data.id);

    formRef.current?.setErrors({});

    formRef.current?.setData(data);
  }, []);

  const handleUngetGrade = useCallback(() => {
    setGradeId('');

    formRef.current?.setErrors({});

    formRef.current?.reset();
  }, []);

  const handleAddGrade = useCallback(
    async (data: Omit<IGrade, 'id'>, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await gradeSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/grades', data);

        setGrades([...grades, response.data]);

        reset();

        toast.success('Turma criada com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(`Erro ao criar turma: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [grades, loadingSubmit],
  );

  const handleUpdateGrade = useCallback(
    async (data: IGrade, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await gradeSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put(`/grades/${gradeId}`, data);

        const gradesWithoutEdited = grades.filter(
          grade => grade.id !== gradeId,
        );

        setGrades([...gradesWithoutEdited, response.data]);

        setGradeId('');

        reset();

        toast.success('Turma atualizada com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(`Erro ao atualizar turma: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [grades, gradeId, loadingSubmit],
  );

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title title="Gerenciar turmas" />

        <DoubleColumn>
          <Form
            ref={formRef}
            onSubmit={!gradeId ? handleAddGrade : handleUpdateGrade}
          >
            <Input placeholder="Nome" name="name" icon={FiInfo} />

            <Input placeholder="Ano" name="year" icon={FiCalendar} />

            <Input
              placeholder="Valor"
              name="value"
              type="number"
              icon={FiDollarSign}
            />

            <ButtonGroup>
              {!gradeId ? (
                <Button type="submit" loading={loadingSubmit}>
                  Adicionar
                </Button>
              ) : (
                <>
                  <Button type="submit" loading={loadingSubmit}>
                    Atualizar
                  </Button>

                  <Button
                    type="submit"
                    backgroundColor="#f44336"
                    onClick={handleUngetGrade}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Form>

          {grades.length > 0 && (
            <GradesList>
              {grades.map(grade => (
                <li key={grade.id}>
                  <FiEdit2 size={20} onClick={() => handleGetGrade(grade)} />
                  {/* <FiTrash
                    size={20}
                    onClick={() => handleRemoveGrade(grade.id)}
                  /> */}
                  <span>{`${grade.name} - ${grade.year}`}</span>
                </li>
              ))}
            </GradesList>
          )}
        </DoubleColumn>
      </Main>
    </Container>
  );
};

export default Users;
