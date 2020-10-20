import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  FiUser,
  FiFlag,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiSmile,
  FiInfo,
  FiActivity,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ValidationError as YupValidationError } from 'yup';

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
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import FileInput from '../../components/File';
import studentSchema from '../../schemas/studentSchema';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import 'react-toastify/dist/ReactToastify.css';

interface StudentFormData {
  name: string;
  father_name: string;
  mother_name: string;
  birth_date: Date;
  nacionality: string;
  birth_city: string;
  birth_state: string;
  gender: 'male' | 'female';
  race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow';
  ease_relating: boolean;
  origin_school?: string;
  health_plan?: string;
  food_alergy?: string;
  medication_alergy?: string;
  health_problem?: string;
  special_necessities?: string;
  school_records_photo?: File;
  vaccine_card_photo?: File;
  birth_certificate_photo?: File;
  health_plan_photo?: File;
  transfer_declaration_photo?: File;
  monthly_declaration_photo?: File;
  grade_id: string;
}

interface IGrades {
  id: string;
  name: string;
  year: string;
}

toast.configure();

const NewStudent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { responsibles } = useResponsibles();

  const [grades, setGrades] = useState([] as IGrades[]);
  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);

  useEffect(() => {
    api.get('/grades').then(response => {
      setGrades(response.data);
    });
  }, []);

  const handleAddStudent = useCallback(
    async (data: StudentFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        await studentSchema.validate(data, {
          abortEarly: false,
        });

        const enrollment = {
          student: {
            name: data.name,
            father_name: data.father_name,
            mother_name: data.mother_name,
            birth_date: data.birth_date,
            nacionality: data.nacionality,
            birth_city: data.birth_city,
            birth_state: data.birth_state,
            gender: data.gender,
            race: data.race,
            ease_relating: data.ease_relating,
            origin_school: data.origin_school,
            health_plan: data.health_plan,
            food_alergy: data.food_alergy,
            medication_alergy: data.medication_alergy,
            health_problem: data.health_problem,
            special_necessities: data.special_necessities,
          },
          grade_id: data.grade_id,
          responsibles: [] as object[],
        };

        responsibles.forEach(responsible => {
          enrollment.responsibles.push({
            id: responsible.id,
            name: responsible.name,
            birth_date: responsible.birth_date,
            nacionality: responsible.nacionality,
            civil_state: responsible.civil_state,
            profission: responsible.profission,
            cpf: responsible.cpf,
            rg: responsible.rg,
            address_street: responsible.address_street,
            address_number: responsible.address_number,
            address_complement: responsible.address_complement,
            address_neighborhood: responsible.address_neighborhood,
            address_city: responsible.address_city,
            address_cep: responsible.address_cep,
            residencial_phone: responsible.residencial_phone,
            commercial_phone: responsible.commercial_phone,
            personal_phone: responsible.personal_phone,
            education_level: responsible.education_level,
            workplace: responsible.workplace,
            monthly_income: responsible.monthly_income,
            income_tax: responsible.income_tax,
            email: responsible.email,
            responsible_type: responsible.responsible_type,
            kinship: responsible.kinship,
          });
        });

        // const response = await api.post('/enrollments', enrollment);

        // const { student_id, responsibles_ids } = response.data;

        const studentPhotosFormData = new FormData();

        if (data.birth_certificate_photo) {
          studentPhotosFormData.append(
            'birth_certificate_photo',
            data.birth_certificate_photo,
          );
        }

        if (data.vaccine_card_photo) {
          studentPhotosFormData.append(
            'vaccine_card_photo',
            data.vaccine_card_photo,
          );
        }

        if (data.health_plan_photo) {
          studentPhotosFormData.append(
            'health_plan_photo',
            data.health_plan_photo,
          );
        }

        if (data.transfer_declaration_photo) {
          studentPhotosFormData.append(
            'transfer_declaration_photo',
            data.transfer_declaration_photo,
          );
        }

        if (data.school_records_photo) {
          studentPhotosFormData.append(
            'school_records_photo',
            data.school_records_photo,
          );
        }

        if (data.monthly_declaration_photo) {
          studentPhotosFormData.append(
            'monthly_declaration_photo',
            data.monthly_declaration_photo,
          );
        }

        reset();

        toast.success('Matrícula enviada com sucesso!');

        history.push('/enrollment-responsibles');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast.error(`Dados incorretos: ${err.response.data.message}`);
      }
    },
    [responsibles, history],
  );

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Nova matrícula" subtitle="Dados do aluno" />

        <Form ref={formRef} onSubmit={handleAddStudent}>
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
              name="birth_city"
              placeholder="Cidade natal"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="birth_state"
              placeholder="Estado natal"
              icon={FiMapPin}
            />

            <Input
              name="origin_school"
              placeholder="Escola de origem"
              icon={FiMapPin}
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="father_name"
              placeholder="Nome do pai"
              icon={FiUsers}
            />

            <Input
              name="mother_name"
              placeholder="Nome da mãe"
              icon={FiUsers}
            />
          </InputGroup>

          <InputGroup>
            <Input type="date" name="birth_date" icon={FiCalendar} />

            <Select name="grade_id" icon={FiSmile}>
              <option value="null">Turma</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {`${grade.name} - ${grade.year}`}
                </option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup>
            <Select name="gender" icon={FiInfo}>
              <option value="null">Gênero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </Select>

            <Select name="race" icon={FiInfo}>
              <option value="null">Raça</option>
              <option value="white">Branco</option>
              <option value="brown">Pardo</option>
              <option value="black">Negro</option>
              <option value="indigenous">Indígena</option>
              <option value="yellow">Amarelo</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_health_plan"
              label="Possui algum plano de saúde?"
              onChange={e => setShowHealthPlan(e.target.checked)}
            />

            {showHealthPlan && (
              <Input name="health_plan" placeholder="Qual?" icon={FiActivity} />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_medication_alergy"
              label="Possui alergia a algum medicamento?"
              onChange={e => setShowMedicationAlergy(e.target.checked)}
            />

            {showMedicationAlergy && (
              <Input
                name="medication_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_food_alergy"
              label="Possui alergia a algum alimento?"
              onChange={e => setShowFoodAlergy(e.target.checked)}
            />

            {showFoodAlergy && (
              <Input name="food_alergy" placeholder="Qual?" icon={FiActivity} />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_health_problem"
              label="Possui algum problema de saúde?"
              onChange={e => setShowHealthProblem(e.target.checked)}
            />

            {showHealthProblem && (
              <Input
                name="health_problem"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="has_special_necessities"
              label="Possui alguma necessidade especial?"
              onChange={e => setShowSpecialNecessities(e.target.checked)}
            />

            {showSpecialNecessities && (
              <Input
                name="special_necessities"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>

          <InputGroup>
            <Checkbox
              name="ease_relating"
              label="Tem facilidade de se relacionar?"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="school_records_photo"
              buttonText="Histórico escolar"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="vaccine_card_photo"
              buttonText="Cartão de vacina"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="birth_certificate_photo"
              buttonText="Certidão de nascimento"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="health_plan_photo"
              buttonText="Cartão do plano de saúde"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="transfer_declaration_photo"
              buttonText="Declaração de transferência"
            />
          </InputGroup>

          <InputGroup>
            <FileInput
              name="monthly_declaration_photo"
              buttonText="Declaração de pagamento de mensalidade"
            />
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
