import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiBriefcase, FiEdit2 } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import { Container, Main, ButtonGroup, DoubleColumn } from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import ProfilesList from '../../components/List';
import IProfile from '../../entities/IProfile';
import api from '../../services/api';
import profileSchema from '../../schemas/profileSchema';
import getValidationErrors from '../../utils/getValidationErrors';

const Profiles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [profiles, setProfiles] = useState([] as IProfile[]);
  const [profileId, setProfileId] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get('/profiles')
      .then(response => {
        setProfiles(response.data);
        console.log(response.data);
      })
      .catch(() => {
        toast.error(
          'Erro ao carregar perfis! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const handleGetProfile = useCallback((data: IProfile) => {
    setProfileId(data.id);

    formRef.current?.setErrors({});

    formRef.current?.setData(data);
  }, []);

  const handleUngetProfile = useCallback(() => {
    setProfileId('');

    formRef.current?.setErrors({});

    formRef.current?.reset();
  }, []);

  const handleAddProfile = useCallback(
    async (data: Omit<IProfile, 'id'>, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await profileSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/profiles', data);

        setProfiles([...profiles, response.data]);

        reset();

        toast.success('Perfil criado com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(`Erro ao criar perfil: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [profiles, loadingSubmit],
  );

  const handleUpdateProfile = useCallback(
    async (data: Omit<IProfile, 'id'>, { reset }) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await profileSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put(`/profiles/${profileId}`, data);

        const profilesWithoutEdited = profiles.filter(
          profile => profile.id !== profileId,
        );

        setProfiles([...profilesWithoutEdited, response.data]);

        setProfileId('');

        reset();

        toast.success('Perfil atualizado com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err.response) {
          toast.error(`Erro ao atualizar perfil: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [profiles, profileId, loadingSubmit],
  );

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title title="Gerenciar perfis e permissões" />

        <DoubleColumn>
          <Form
            ref={formRef}
            onSubmit={!profileId ? handleAddProfile : handleUpdateProfile}
          >
            <Input placeholder="Nome" name="name" icon={FiBriefcase} />

            <Checkbox
              name="create_new_enrollments_permiss"
              label="Criar nova matrícula"
            />

            <Checkbox
              name="validate_enrollments_permiss"
              label="Aprovar e desaprovar matrículas"
            />

            <Checkbox
              name="create_extra_debits_permiss"
              label="Criar débitos extras"
            />

            <Checkbox name="pay_debits_permiss" label="Pagar débitos" />

            <Checkbox
              name="discharge_payments_permiss"
              label="Receber pagamentos"
            />

            <Checkbox
              name="generate_documents_permiss"
              label="Gerar documentos"
            />

            <Checkbox name="crud_profiles_permiss" label="Gerenciar perfis" />

            <Checkbox name="crud_users_permiss" label="Gerenciar usuários" />

            <Checkbox name="crud_grades_permiss" label="Gerenciar turmas" />

            <Checkbox
              name="crud_extra_debits_permiss"
              label="Gerenciar débitos extras"
            />

            <ButtonGroup>
              {!profileId ? (
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
                    onClick={handleUngetProfile}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Form>

          {profiles.length > 0 && (
            <ProfilesList>
              {profiles.map(profile => (
                <li key={profile.id}>
                  <FiEdit2
                    size={20}
                    onClick={() => handleGetProfile(profile)}
                  />
                  {/* <FiTrash
                    size={20}
                    onClick={() => handleRemoveProfile(profile.id)}
                  /> */}
                  <span>{profile.name}</span>
                </li>
              ))}
            </ProfilesList>
          )}
        </DoubleColumn>
      </Main>
    </Container>
  );
};

export default Profiles;
