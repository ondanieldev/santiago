import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiInfo,
  FiCalendar,
  FiDollarSign,
  FiTrash,
  FiEdit2,
} from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import { Container, Main, ButtonGroup, DoubleColumn } from './styles';
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

  useEffect(() => {
    api.get('/grades').then(response => setGrades(response.data));
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

        toast.error(`Erro ao criar turma: ${err.response.data.message}`);
      }
    },
    [grades],
  );

  const handleUpdateGrade = useCallback(
    async (data: IGrade, { reset }) => {
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

        toast.error(`Erro ao atualizar turma: ${err.response.data.message}`);
      }
    },
    [grades, gradeId],
  );

  return (
    <Container>
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
                <Button type="submit">Adicionar</Button>
              ) : (
                <>
                  <Button type="submit">Atualizar</Button>

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
