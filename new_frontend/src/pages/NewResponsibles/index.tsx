import React, { useCallback, useRef } from 'react';
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

import {
  Container,
  Main,
  InputGroup,
  ResponsiblesList,
  NavigationButtonsContainer,
} from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';

interface AddResponsibleFormData {
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
  rg_photo?: string;
  cpf_photo?: string;
  residencial_proof_photo?: string;
  kinship: string;
  responsible_type: 'financial' | 'supportive' | 'educational';
}

const NewReponsibles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleAddResponsible = useCallback((data: AddResponsibleFormData) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Form ref={formRef} onSubmit={handleAddResponsible}>
          <InputGroup>
            <Input name="name" placeholder="Nome" icon={FiUser} />

            <Input
              name="kinship"
              placeholder="Parentesco com o aluno"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup>
            <Input name="rg" placeholder="RG" icon={FiClipboard} />

            <Input name="cpf" placeholder="CPF" icon={FiClipboard} />
          </InputGroup>

          <InputGroup>
            <Input
              name="nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />

            <Input
              name="civil_state"
              placeholder="Estado civil"
              icon={FiHeart}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="education_level"
              placeholder="Grau de instrução"
              icon={FiInfo}
            />

            <Input
              name="profission"
              placeholder="Profissão"
              icon={FiBriefcase}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="workplace"
              placeholder="Local de trabalho"
              icon={FiBriefcase}
            />

            <Input
              name="commercial_phone"
              placeholder="Telefone comercial"
              icon={FiPhone}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="residencial_phone"
              placeholder="Telefone residencial"
              icon={FiPhone}
            />

            <Input
              name="phone_number"
              placeholder="Telefone pessoal"
              icon={FiSmartphone}
            />
          </InputGroup>

          <InputGroup>
            <Input name="address_street" placeholder="Rua" icon={FiMapPin} />

            <Input
              type="number"
              name="address_number"
              placeholder="Número"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="address_complement"
              placeholder="Complemento"
              icon={FiMapPin}
            />

            <Input
              name="address_neighborhood"
              placeholder="Bairro"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input name="address_city" placeholder="Cidade" icon={FiMapPin} />

            <Input name="address_cep" placeholder="CEP" icon={FiMapPin} />
          </InputGroup>

          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              type="number"
              name="monthly_income"
              placeholder="Renda mensal"
              icon={FiDollarSign}
            />
          </InputGroup>

          <InputGroup>
            <Input type="date" name="birth_date" icon={FiCalendar} />

            <Select name="responsible_type" icon={FiFileText}>
              <option value="null">Selecionar tipo de responsável</option>
              <option value="financial">Financeiro</option>
              <option value="supportive">Solidário</option>
              <option value="educational">Escolar</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Checkbox name="income_tax" label="Declara imposto de renda?" />
          </InputGroup>

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

          <Button type="submit">Adicionar</Button>
          <Button type="submit">Atualizar</Button>
          <Button type="submit" backgroundColor="#f44336">
            Cancelar
          </Button>
        </Form>

        <ResponsiblesList>
          <li>
            <FiEdit2 size={20} />
            <FiTrash size={20} />
            <span>Nome - tipo</span>
          </li>
          <li>
            <FiEdit2 size={20} />
            <FiTrash size={20} />
            <span>Nome - tipo</span>
          </li>
        </ResponsiblesList>

        <NavigationButtonsContainer>
          <Link to="/enrollment-student">
            <Button type="button">Ir para cadastro de alunos</Button>
          </Link>
        </NavigationButtonsContainer>
      </Main>
    </Container>
  );
};

export default NewReponsibles;
