import React, { useCallback, useRef } from 'react';
import { FiUser, FiFlag, FiMapPin, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import {
  Container,
  Main,
  InputGroup,
  NavigationButtonsContainer,
} from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface StudentFormData {
  name: string;
  father_name: string;
  mother_name: string;
  // birth_date: Date;
  nacionality: string;
  birth_city: string;
  birth_state: string;
  // gender: 'male' | 'female';
  // race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow';
  // ease_relating: boolean;
  origin_school?: string;
  health_plan?: string;
  food_alergy?: string;
  medication_alergy?: string;
  health_problem?: string;
  special_necessities?: string;
}

const NewStudent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleAddResponsible = useCallback((data: StudentFormData) => {
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
          </InputGroup>

          <InputGroup>
            <Input
              name="nacionality"
              placeholder="Nacionalidade"
              icon={FiFlag}
            />
            <Input
              name="birthCity"
              placeholder="Cidade natal"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="birthState"
              placeholder="Estado natal"
              icon={FiMapPin}
            />
            <Input
              name="originSchool"
              placeholder="Escola de origem"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input name="fatherName" placeholder="Nome do pai" icon={FiUsers} />
            <Input name="motherName" placeholder="Nome da mãe" icon={FiUsers} />
          </InputGroup>

          <NavigationButtonsContainer>
            <Link to="/enrollment-responsibles">
              <Button type="button" backgroundColor="#FFCF00" color="#212529">
                Voltar para cadastro de responsáveis
              </Button>
            </Link>

            <Button type="submit">Finalizar matrícula</Button>
          </NavigationButtonsContainer>
        </Form>
      </Main>
    </Container>
  );
};

export default NewStudent;
