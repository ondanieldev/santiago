import React, { useCallback, useRef, useState } from 'react';
import {
  FiUser,
  FiUsers,
  FiClipboard,
  FiFlag,
  FiHeart,
  FiInfo,
  FiBriefcase,
  FiPhone,
  FiSmartphone,
  FiMapPin,
  FiMail,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiEdit2,
  FiTrash,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { uuid } from 'uuidv4';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import {
  Container,
  Main,
  InputGroup,
  NavigationButtonsContainer,
} from './styles';
import { useResponsibles } from '../../hooks/responsibles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Searchbar from '../../components/Searchbar';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';
import ResponsiblesList from '../../components/List';
import responsibleSchema from '../../schemas/responsibleSchema';
import responsibleWithIdSchema from '../../schemas/responsibleWithIdSchema';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

interface IResponsibleFormData {
  id?: string;
  tmpId: string;
  name: string;
  birth_date: Date;
  nacionality: string;
  civil_state: string;
  profission: string;
  cpf: string;
  rg: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_cep: string;
  residencial_phone: string;
  commercial_phone: string;
  personal_phone: string;
  education_level: string;
  workplace: string;
  monthly_income: number;
  income_tax: boolean;
  email: string;
  rg_photo?: File;
  cpf_photo?: File;
  residencial_proof_photo?: File;
  kinship: string;
  responsible_type: 'financial' | 'supportive' | 'educational';
}

interface IAddress {
  tmpId: string;
  name: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_cep: string;
}

toast.configure();

const NewReponsibles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const searchFormRef = useRef<FormHandles>(null);

  const [responsibleId, setResponsibleId] = useState('');
  const [responsibleTmpId, setResponsibleTmpId] = useState('');
  const [addresses, setAddresses] = useState([] as IAddress[]);

  const {
    responsibles,
    getResponsible,
    addResponsible,
    removeResponsible,
    updateResponsible,
  } = useResponsibles();

  const handleSearchResponsible = useCallback(
    async ({ cpf }: { cpf: string }, { reset }) => {
      try {
        const response = await api.get(`/persons/${cpf}`);

        if (!response.data) {
          return;
        }

        formRef.current?.setData(response.data);

        setResponsibleId(response.data.id);

        reset();
      } catch {}
    },
    [],
  );

  const handleAddResponsible = useCallback(
    async (data: IResponsibleFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        if (responsibleId) {
          await responsibleWithIdSchema.validate(data, {
            abortEarly: false,
          });
        } else {
          await responsibleSchema.validate(data, {
            abortEarly: false,
          });
        }

        const responsible = data;

        responsible.tmpId = uuid();

        if (responsibleId) {
          responsible.id = responsibleId;
        }

        addResponsible(responsible);

        setResponsibleId('');

        setAddresses([
          ...addresses,
          {
            tmpId: responsible.tmpId,
            name: responsible.name,
            address_cep: responsible.address_cep,
            address_city: responsible.address_city,
            address_neighborhood: responsible.address_neighborhood,
            address_number: responsible.address_number,
            address_street: responsible.address_street,
            address_complement: responsible.address_complement,
          },
        ]);

        reset();

        toast.success('Dados salvos com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast.error('Dados incorretos!');
      }
    },
    [addResponsible, responsibleId, addresses],
  );

  const handleGetResponsible = useCallback(
    (tmpId: string) => {
      const responsible = getResponsible(tmpId);

      if (responsible) {
        setResponsibleTmpId(responsible?.tmpId);

        formRef.current?.setData(responsible);
      }
    },
    [getResponsible],
  );

  const handleUpdateResponsible = useCallback(
    async (data: IResponsibleFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const responsibleFromHook = responsibles.find(
          responsible => responsible.tmpId === responsibleTmpId,
        );

        if (!responsibleFromHook) {
          return;
        }

        const responsible = data;

        responsible.tmpId = responsibleTmpId;

        if (responsibleId) {
          await responsibleWithIdSchema.validate(data, {
            abortEarly: false,
          });

          responsible.id = responsibleId;
        } else {
          await responsibleSchema.validate(data, {
            abortEarly: false,
          });
        }

        responsible.rg_photo = responsibleFromHook.rg_photo;
        responsible.cpf_photo = responsibleFromHook.cpf_photo;
        responsible.residencial_proof_photo =
          responsibleFromHook.residencial_proof_photo;

        updateResponsible(responsible);

        setResponsibleTmpId('');

        setResponsibleId('');

        const addressesWithoutUpdated = addresses.filter(
          address => address.tmpId !== responsible.tmpId,
        );

        setAddresses([
          ...addressesWithoutUpdated,
          {
            tmpId: responsible.tmpId,
            name: responsible.name,
            address_cep: responsible.address_cep,
            address_complement: responsible.address_complement,
            address_street: responsible.address_street,
            address_number: responsible.address_number,
            address_neighborhood: responsible.address_neighborhood,
            address_city: responsible.address_city,
          },
        ]);

        reset();

        toast.success('Dados atualizados com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast.error('Dados incorretos!');
      }
    },
    [
      updateResponsible,
      responsibleTmpId,
      responsibleId,
      addresses,
      responsibles,
    ],
  );

  const handleUngetReponsible = useCallback(() => {
    setResponsibleTmpId('');

    setResponsibleId('');

    formRef.current?.reset();
  }, []);

  const handleRemoveResponsible = useCallback(
    (tmpId: string) => {
      if (!responsibleTmpId) {
        removeResponsible(tmpId);

        toast.success('Dados removidos com sucesso!');
      }
    },
    [responsibleTmpId, removeResponsible],
  );

  const handleSelectAddress = useCallback(
    e => {
      const tmpId = e.target.value;

      const findAddress = addresses.find(address => address.tmpId === tmpId);

      if (findAddress) {
        formRef.current?.setFieldValue('address_cep', findAddress.address_cep);
        formRef.current?.setFieldValue(
          'address_city',
          findAddress.address_city,
        );
        formRef.current?.setFieldValue(
          'address_complement',
          findAddress.address_complement,
        );
        formRef.current?.setFieldValue(
          'address_neighborhood',
          findAddress.address_neighborhood,
        );
        formRef.current?.setFieldValue(
          'address_number',
          findAddress.address_number,
        );
        formRef.current?.setFieldValue(
          'address_street',
          findAddress.address_street,
        );
      }
    },
    [addresses],
  );

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Nova matrícula" subtitle="Dados dos responsáveis" />

        <Form ref={searchFormRef} onSubmit={handleSearchResponsible}>
          <Searchbar
            name="cpf"
            placeholder="Pesquise um responsável pelo CPF"
          />
        </Form>

        <Form
          ref={formRef}
          onSubmit={
            responsibleTmpId ? handleUpdateResponsible : handleAddResponsible
          }
        >
          <InputGroup>
            <Input
              name="name"
              placeholder="Nome"
              icon={FiUser}
              readOnly={!!responsibleId}
            />

            <Input
              name="kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="rg"
              placeholder="RG"
              icon={FiClipboard}
              readOnly={!!responsibleId}
            />

            <Input
              name="cpf"
              placeholder="CPF"
              icon={FiClipboard}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
              readOnly={!!responsibleId}
            />

            <Input
              name="civil_state"
              placeholder="Estado civil"
              icon={FiHeart}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="education_level"
              placeholder="Grau de instrução"
              icon={FiInfo}
              readOnly={!!responsibleId}
            />

            <Input
              name="profission"
              placeholder="Profissão"
              icon={FiBriefcase}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="workplace"
              placeholder="Local de trabalho"
              icon={FiBriefcase}
              readOnly={!!responsibleId}
            />

            <Input
              name="commercial_phone"
              placeholder="Telefone comercial"
              icon={FiPhone}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="residencial_phone"
              placeholder="Telefone residencial"
              icon={FiPhone}
              readOnly={!!responsibleId}
            />

            <Input
              name="personal_phone"
              placeholder="Telefone pessoal"
              icon={FiSmartphone}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          {addresses.length > 0 && !responsibleId && (
            <InputGroup>
              <Select
                name="address"
                icon={FiFileText}
                defaultValue="null"
                onChange={e => handleSelectAddress(e)}
              >
                <option value="null">Reaproveitar endereço</option>
                {addresses.map(address => (
                  <option key={address.tmpId} value={address.tmpId}>
                    Endereço de {address.name}
                  </option>
                ))}
              </Select>
            </InputGroup>
          )}
          <InputGroup>
            <Input
              name="address_street"
              placeholder="Rua"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />

            <Input
              type="number"
              name="address_number"
              placeholder="Número"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />

            <Input
              name="address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="address_city"
              placeholder="Cidade"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />

            <Input
              name="address_cep"
              placeholder="CEP"
              icon={FiMapPin}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              readOnly={!!responsibleId}
            />

            <Input
              type="number"
              name="monthly_income"
              placeholder="Renda mensal"
              icon={FiDollarSign}
              readOnly={!!responsibleId}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="date"
              name="birth_date"
              icon={FiCalendar}
              readOnly={!!responsibleId}
            />

            <Select
              name="responsible_type"
              icon={FiFileText}
              defaultValue="null"
            >
              <option value="null">Selecionar tipo de responsável</option>
              <option value="financial">Financeiro</option>
              <option value="supportive">Solidário</option>
              <option value="educational">Escolar</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="income_tax"
              label="Declara imposto de renda?"
              disabled={!!responsibleId}
            />
          </InputGroup>

          {!responsibleId && !responsibleTmpId && (
            <>
              <InputGroup>
                <FileInput name="rg_photo" buttonText="RG" />
              </InputGroup>

              <InputGroup>
                <FileInput name="cpf_photo" buttonText="CPF" />
              </InputGroup>

              <InputGroup>
                <FileInput
                  name="residencial_proof_photo"
                  buttonText="Comprovante de residência"
                />
              </InputGroup>
            </>
          )}

          {!responsibleTmpId && <Button type="submit">Adicionar</Button>}
          {responsibleTmpId && <Button type="submit">Atualizar</Button>}
          {(responsibleTmpId || responsibleId) && (
            <Button
              type="submit"
              backgroundColor="#f44336"
              onClick={handleUngetReponsible}
            >
              Cancelar
            </Button>
          )}
        </Form>

        {responsibles && responsibles.length > 0 && (
          <ResponsiblesList>
            {responsibles.map(responsible => (
              <li key={responsible.tmpId}>
                <FiEdit2
                  size={20}
                  onClick={() => handleGetResponsible(responsible.tmpId)}
                />
                <FiTrash
                  size={20}
                  onClick={() => handleRemoveResponsible(responsible.tmpId)}
                />
                <span>{responsible.name}</span>
              </li>
            ))}
          </ResponsiblesList>
        )}

        <NavigationButtonsContainer>
          <Link to="/enrollment-student">
            <Button type="button">Ir para cadastro de aluno</Button>
          </Link>
        </NavigationButtonsContainer>
      </Main>
    </Container>
  );
};

export default NewReponsibles;
