import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiBriefcase, FiLock, FiEdit2 } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import { Container, Main, ButtonGroup, DoubleColumn } from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import UsersList from '../../components/List';
import IUser from '../../entities/IUser';
import IProfile from '../../entities/IProfile';
import api from '../../services/api';
import userSchema from '../../schemas/userSchema';
import getValidationErrors from '../../utils/getValidationErrors';

const Users: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [users, setUsers] = useState([] as IUser[]);
  const [profiles, setProfiles] = useState([] as IProfile[]);
  const [userId, setUserId] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get('/users')
      .then(response => setUsers(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carregar usuários! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  useEffect(() => {
    api
      .get('/profiles')
      .then(response => setProfiles(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carregar perfis! Por favor, tente novamente mais tarde.',
        );
      });
  }, []);

  const handleGetUser = useCallback((data: Omit<IUser, 'profile'>) => {
    setUserId(data.id);

    formRef.current?.setErrors({});

    formRef.current?.setData(data);
  }, []);

  const handleUngetUser = useCallback(() => {
    setUserId('');

    formRef.current?.setErrors({});

    formRef.current?.reset();
  }, []);

  const handleAddUser = useCallback(
    async (data: Omit<IUser, 'id' | 'profile'>, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await userSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/users', data);

        setUsers([...users, response.data]);

        reset();

        toast.success('Usuário criado com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(`Erro ao criar usuário: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [users, loadingSubmit],
  );

  const handleUpdateUser = useCallback(
    async (data: Omit<IUser, 'id' | 'profile'>, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await userSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put(`/users/${userId}`, data);

        const usersWithoutEdited = users.filter(user => user.id !== userId);

        setUsers([...usersWithoutEdited, response.data]);

        setUserId('');

        reset();

        toast.success('Usuário atualizado com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(
            `Erro ao atualizar usuário: ${err.response.data.message}`,
          );
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [users, userId, loadingSubmit],
  );

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title title="Gerenciar usuários" />

        <DoubleColumn>
          <Form
            ref={formRef}
            onSubmit={!userId ? handleAddUser : handleUpdateUser}
          >
            <Input placeholder="Usuário" name="username" icon={FiUser} />

            <Input
              placeholder="Senha"
              name="password"
              type="password"
              icon={FiLock}
            />

            <Select name="profile_id" icon={FiBriefcase} defaultValue="null">
              <option value="null">Selecionar perfil</option>
              {profiles.map(profile => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </Select>

            <ButtonGroup>
              {!userId ? (
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
                    onClick={handleUngetUser}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Form>

          {users.length > 0 && (
            <UsersList>
              {users.map(user => (
                <li key={user.id}>
                  <FiEdit2 size={20} onClick={() => handleGetUser(user)} />
                  {/* <FiTrash
                    size={20}
                    onClick={() => handleRemoveUser(user.id)}
                  /> */}
                  <span>{user.username}</span>
                </li>
              ))}
            </UsersList>
          )}
        </DoubleColumn>
      </Main>
    </Container>
  );
};

export default Users;
