import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiClipboard,
  FiFlag,
  FiUser,
  FiUsers,
  FiHeart,
  FiBriefcase,
  FiPhone,
  FiSmartphone,
  FiMapPin,
  FiMail,
  FiDollarSign,
  FiArrowRight,
  FiInfo,
  FiCalendar,
  FiSmile,
  FiActivity,
} from 'react-icons/fi';
import cepPromise from 'cep-promise';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Select from '../../components/SelectInput';
import Radio from '../../components/RadioInput';
import Checkbox from '../../components/Checkbox';
import File from '../../components/FileInput';
import Button from '../../components/Button';
import {
  educationLevelOptions,
  genderOptions,
  raceOptions,
  IOption,
} from '../../utils/defaults';
import { Container, Main, FormGroup, InputGroup, ButtonGroup } from './styles';
import api from '../../services/api';
import IGrade from '../../entities/IGrade';
import IPerson from '../../entities/IPerson';
import IStudent from '../../entities/IStudent';
import studentSchema from '../../schemas/studentSchema';
import responsibleSchema from '../../schemas/responsibleSchema';
import getValidationErrors from '../../utils/getValidationErrors';

import 'react-toastify/dist/ReactToastify.css';

interface IConfigDTO {
  has_food_alergy: 'no' | 'yes';
  has_health_plan: 'no' | 'yes';
  has_health_problem: 'no' | 'yes';
  has_medication_alergy: 'no' | 'yes';
  has_origin_school: 'no' | 'yes';
  has_special_necessities: 'no' | 'yes';
  verify_financial_cpf: string;
  verify_supportive_cpf: string;
  reaproove_address: boolean;
  financial_income_tax: 'no' | 'yes';
  student_ease_relating: 'no' | 'yes';
}

interface IGradeDTO {
  id: string;
}

type IStudentDTO = Omit<
  IStudent,
  | 'birth_certificate_photo'
  | 'vaccine_card_photo'
  | 'health_plan_photo'
  | 'transfer_declaration_photo'
  | 'monthly_declaration_photo'
  | 'school_records_photo'
>;

interface IStudentPhotosDTO {
  birth_certificate_photo?: string;
  vaccine_card_photo?: string;
  health_plan_photo?: string;
  transfer_declaration_photo?: string;
  monthly_declaration_photo?: string;
  school_records_photo?: string;
}

interface IResponsibleDTO
  extends Omit<IPerson, 'rg_photo' | 'cpf_photo' | 'residencial_proof_photo'> {
  kinship: string;
}

interface IResponsiblePhotosDTO {
  rg_photo?: string;
  cpf_photo?: string;
  residencial_proof_photo?: string;
}

interface IFormData {
  config: IConfigDTO;
  grade: IGradeDTO;
  student: IStudentDTO;
  student_photos: IStudentPhotosDTO;
  financial_responsible: IResponsibleDTO;
  financial_photos: IResponsiblePhotosDTO;
  supportive_responsible: IResponsibleDTO;
  supportive_photos: IResponsiblePhotosDTO;
}

const NewEnrollment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [reuseAddress, setReuseAddress] = useState(false);
  const [gradeOptions, setGradeOptions] = useState([] as IOption[]);
  const [showOriginSchool, setShowOriginSchool] = useState(false);
  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);
  const [financialVerified, setFinancialVerified] = useState(false);
  const [financialExists, setFinancialExists] = useState(false);
  const [financialFromDB, setFinancialFromDB] = useState({} as IPerson);
  const [supportiveVerified, setSupportiveVerified] = useState(false);
  const [supportiveExists, setSupportiveExists] = useState(false);
  const [supportiveFromDB, setSupportiveFromDB] = useState({} as IPerson);

  const submitForm = useCallback(
    async (data: IFormData) => {
      let actualPrefixVerification = '';

      if (!financialVerified || !supportiveVerified) {
        return;
      }

      try {
        formRef.current?.setErrors({});

        const {
          config,
          financial_photos,
          financial_responsible,
          supportive_photos,
          supportive_responsible,
          student_photos,
          student,
          grade,
        } = data;

        financial_responsible.income_tax =
          config.financial_income_tax === 'yes';

        student.ease_relating = config.student_ease_relating === 'yes';

        if (!financialExists) {
          actualPrefixVerification = 'financial_responsible';

          await responsibleSchema.validate(financial_responsible, {
            abortEarly: false,
          });
        }

        if (!supportiveExists) {
          actualPrefixVerification = 'supportive_responsible';

          await responsibleSchema.validate(supportive_responsible, {
            abortEarly: false,
          });
        }

        actualPrefixVerification = 'student';

        await studentSchema.validate(student, {
          abortEarly: false,
        });

        const response = await api.post('/enrollments', {
          grade,
          student,
          financial_responsible,
          financial_responsible_id: financialFromDB.id,
          supportive_responsible,
          supportive_responsible_id: supportiveFromDB.id,
        });

        const { financial_id, supportive_id, student_id } = response.data;

        if (financial_photos) {
          const financialPhotos = new FormData();

          if (financial_photos.rg_photo) {
            financialPhotos.append('rg_photo', financial_photos.rg_photo);
          }

          if (financial_photos.cpf_photo) {
            financialPhotos.append('cpf_photo', financial_photos.cpf_photo);
          }

          if (financial_photos.residencial_proof_photo) {
            financialPhotos.append(
              'residencial_proof_photo',
              financial_photos.residencial_proof_photo,
            );
          }

          await api.patch(`/persons/photos/${financial_id}`, financialPhotos);
        }

        if (supportive_photos) {
          const supportivePhotos = new FormData();

          if (supportive_photos.rg_photo) {
            supportivePhotos.append('rg_photo', supportive_photos.rg_photo);
          }

          if (supportive_photos.cpf_photo) {
            supportivePhotos.append('cpf_photo', supportive_photos.cpf_photo);
          }

          if (supportive_photos.residencial_proof_photo) {
            supportivePhotos.append(
              'residencial_proof_photo',
              supportive_photos.residencial_proof_photo,
            );
          }

          await api.patch(`/persons/photos/${supportive_id}`, supportivePhotos);
        }

        if (student_photos) {
          const studentPhotos = new FormData();

          if (student_photos.birth_certificate_photo) {
            studentPhotos.append(
              'birth_certificate_photo',
              student_photos.birth_certificate_photo,
            );
          }

          if (student_photos.health_plan_photo) {
            studentPhotos.append(
              'health_plan_photo',
              student_photos.health_plan_photo,
            );
          }

          if (student_photos.monthly_declaration_photo) {
            studentPhotos.append(
              '.monthly_declaration_photo',
              student_photos.monthly_declaration_photo,
            );
          }

          if (student_photos.school_records_photo) {
            studentPhotos.append(
              '.school_records_photo',
              student_photos.school_records_photo,
            );
          }

          if (student_photos.transfer_declaration_photo) {
            studentPhotos.append(
              '.transfer_declaration_photo',
              student_photos.transfer_declaration_photo,
            );
          }

          if (student_photos.vaccine_card_photo) {
            studentPhotos.append(
              '.vaccine_card_photo',
              student_photos.vaccine_card_photo,
            );
          }

          await api.patch(`/students/photos/${student_id}`, studentPhotos);
        }

        toast.success('Solicitação de matrícula enviada com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          err.inner.forEach(error => {
            error.path = `${actualPrefixVerification}.${error.path}`;
          });

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          toast.error(`Oops, alguns dados não foram preenchidos corretamente!`);
        }

        console.log(err);

        if (err.response) {
          toast.error(`Dados incorretos: ${err.response.data.message}`);
        }
      }
    },
    [
      financialExists,
      supportiveExists,
      financialVerified,
      supportiveVerified,
      financialFromDB.id,
      supportiveFromDB.id,
    ],
  );

  const handleSearchAddressByCep = useCallback((cep, responsible_type) => {
    cepPromise(cep).then(result => {
      const { street, neighborhood, city } = result;

      if (responsible_type === 'financial') {
        formRef.current?.setFieldValue(
          'financial_responsible.address_street',
          street,
        );
        formRef.current?.setFieldValue(
          'financial_responsible.address_neighborhood',
          neighborhood,
        );
        formRef.current?.setFieldValue(
          'financial_responsible.address_city',
          city,
        );
      } else {
        formRef.current?.setFieldValue(
          'supportive_responsible.address_street',
          street,
        );
        formRef.current?.setFieldValue(
          'supportive_responsible.address_neighborhood',
          neighborhood,
        );
        formRef.current?.setFieldValue(
          'supportive_responsible.address_city',
          city,
        );
      }
    });
  }, []);

  const handleVerifyIfResponsibleExists = useCallback(
    async (responsible_type: 'financial' | 'supportive') => {
      try {
        const cpf = formRef.current?.getFieldValue(
          `config.verify_${responsible_type}_cpf`,
        );

        const response = await api.get(`/persons/${cpf}`);

        const person = response.data as IPerson;

        if (responsible_type === 'financial') {
          setFinancialVerified(true);

          if (person) {
            setFinancialExists(true);
            setFinancialFromDB(person);
          }
        } else {
          setSupportiveVerified(true);

          if (person) {
            setSupportiveExists(true);
            setSupportiveFromDB(person);
          }
        }
      } catch {}
    },
    [formRef],
  );

  useEffect(() => {
    if (reuseAddress) {
      const street = formRef.current?.getFieldValue(
        'financial_responsible.address_street',
      );
      const number = formRef.current?.getFieldValue(
        'financial_responsible.address_number',
      );
      const complement = formRef.current?.getFieldValue(
        'financial_responsible.address_complement',
      );
      const neighborhood = formRef.current?.getFieldValue(
        'financial_responsible.address_neighborhood',
      );
      const city = formRef.current?.getFieldValue(
        'financial_responsible.address_city',
      );
      const cep = formRef.current?.getFieldValue(
        'financial_responsible.address_cep',
      );

      formRef.current?.setFieldValue(
        'supportive_responsible.address_street',
        street,
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_number',
        number,
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_complement',
        complement,
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_neighborhood',
        neighborhood,
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_city',
        city,
      );
      formRef.current?.setFieldValue('supportive_responsible.address_cep', cep);
    } else {
      formRef.current?.setFieldValue(
        'supportive_responsible.address_street',
        '',
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_number',
        '',
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_complement',
        '',
      );
      formRef.current?.setFieldValue(
        'supportive_responsible.address_neighborhood',
        '',
      );
      formRef.current?.setFieldValue('supportive_responsible.address_city', '');
      formRef.current?.setFieldValue('supportive_responsible.address_cep', '');
    }
  }, [reuseAddress]);

  useEffect(() => {
    api.get('/grades').then(response => {
      const grades = [] as IOption[];

      const gradesFromApi = response.data as IGrade[];

      grades.push({ value: '', label: 'Turma desejada' });

      gradesFromApi.forEach(grade => {
        grades.push({ value: grade.id, label: grade.name });
      });

      setGradeOptions(grades);
    });
  }, []);

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Nova matrícula" />

        <Form ref={formRef} onSubmit={submitForm}>
          <FormGroup>
            <Heading title="Dados do responsável financeiro" />

            <InputGroup>
              <Input
                name="config.verify_financial_cpf"
                icon={FiClipboard}
                placeholder="Digite o CPF para verificar se já está cadastrado"
              />

              <div>
                <Button
                  type="button"
                  onClick={() => handleVerifyIfResponsibleExists('financial')}
                >
                  Verificar registro
                </Button>
              </div>
            </InputGroup>

            {financialVerified && financialExists && (
              <InputGroup displayColumn={window.innerWidth <= 700}>
                <Input
                  name="financial_responsible.name"
                  placeholder="Nome"
                  icon={FiUser}
                  value={financialFromDB.name}
                  readOnly
                />

                <Input
                  name="financial_responsible.kinship"
                  placeholder="Parentesco com o aluno"
                  icon={FiUsers}
                />
              </InputGroup>
            )}

            {financialVerified && !financialExists && (
              <>
                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.name"
                    placeholder="Nome"
                    icon={FiUser}
                  />

                  <Input
                    name="financial_responsible.kinship"
                    placeholder="Parentesco com o aluno"
                    icon={FiUsers}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.rg"
                    placeholder="RG"
                    icon={FiClipboard}
                  />

                  <Input
                    name="financial_responsible.cpf"
                    placeholder="CPF"
                    icon={FiClipboard}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.nacionality"
                    placeholder="Nacionalidade"
                    icon={FiFlag}
                  />

                  <Input
                    name="financial_responsible.civil_state"
                    placeholder="Estado civil"
                    icon={FiHeart}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Select
                    name="financial_responsible.education_level"
                    icon={FiInfo}
                    optionsArray={educationLevelOptions}
                  />

                  <Input
                    name="financial_responsible.profission"
                    placeholder="Profissão"
                    icon={FiBriefcase}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.workplace"
                    placeholder="Local de trabalho"
                    icon={FiBriefcase}
                  />

                  <Input
                    name="financial_responsible.commercial_phone"
                    placeholder="Telefone comercial"
                    icon={FiPhone}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.residencial_phone"
                    placeholder="Telefone residencial"
                    icon={FiPhone}
                  />

                  <Input
                    name="financial_responsible.personal_phone"
                    placeholder="Telefone pessoal"
                    icon={FiSmartphone}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.address_cep"
                    placeholder="CEP"
                    icon={FiMapPin}
                    onBlur={e =>
                      handleSearchAddressByCep(e.target.value, 'financial')
                    }
                  />

                  <Input
                    name="financial_responsible.address_street"
                    placeholder="Rua"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="number"
                    name="financial_responsible.address_number"
                    placeholder="Número"
                    icon={FiMapPin}
                  />

                  <Input
                    name="financial_responsible.address_complement"
                    placeholder="Complemento"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="financial_responsible.address_neighborhood"
                    placeholder="Bairro"
                    icon={FiMapPin}
                  />

                  <Input
                    name="financial_responsible.address_city"
                    placeholder="Cidade"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="email"
                    name="financial_responsible.email"
                    placeholder="E-mail"
                    icon={FiMail}
                  />

                  <Input
                    type="number"
                    name="financial_responsible.monthly_income"
                    placeholder="Renda mensal"
                    icon={FiDollarSign}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="date"
                    name="financial_responsible.birth_date"
                    icon={FiCalendar}
                    label="Data de nascimento"
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Radio
                    name="config.financial_income_tax"
                    label="Declara imposto de renda?"
                    options={[
                      { id: 'fit1', label: 'Sim', value: 'yes' },
                      { id: 'fit2', label: 'Não', value: 'no', default: true },
                    ]}
                  />
                </InputGroup>

                <InputGroup>
                  <File name="financial_photos.rg_photo" buttonText="RG" />
                </InputGroup>

                <InputGroup>
                  <File name="financial_photos.cpf_photo" buttonText="CPF" />
                </InputGroup>

                <InputGroup>
                  <File
                    name="financial_photos.residencial_proof_photo"
                    buttonText="Comprovante de endereço"
                  />
                </InputGroup>
              </>
            )}
          </FormGroup>

          <FormGroup>
            <Heading title="Dados do responsável solidário" />

            <InputGroup>
              <Input
                name="config.verify_supportive_cpf"
                icon={FiClipboard}
                placeholder="Digite o CPF para verificar se já está cadastrado"
              />

              <div>
                <Button
                  type="button"
                  onClick={() => handleVerifyIfResponsibleExists('supportive')}
                >
                  Verificar registro
                </Button>
              </div>
            </InputGroup>

            {supportiveVerified && supportiveExists && (
              <InputGroup displayColumn={window.innerWidth <= 700}>
                <Input
                  name="supportive_responsible.name"
                  placeholder="Nome"
                  icon={FiUser}
                  value={supportiveFromDB.name}
                  readOnly
                />

                <Input
                  name="supportive_responsible.kinship"
                  placeholder="Parentesco com o aluno"
                  icon={FiUsers}
                />
              </InputGroup>
            )}

            {supportiveVerified && !supportiveExists && (
              <>
                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.name"
                    placeholder="Nome"
                    icon={FiUser}
                  />

                  <Input
                    name="supportive_responsible.kinship"
                    placeholder="Parentesco com o aluno"
                    icon={FiUsers}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.rg"
                    placeholder="RG"
                    icon={FiClipboard}
                  />

                  <Input
                    name="supportive_responsible.cpf"
                    placeholder="CPF"
                    icon={FiClipboard}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.nacionality"
                    placeholder="Nacionalidade"
                    icon={FiFlag}
                  />

                  <Input
                    name="supportive_responsible.civil_state"
                    placeholder="Estado civil"
                    icon={FiHeart}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Select
                    name="supportive_responsible.education_level"
                    icon={FiInfo}
                    optionsArray={educationLevelOptions}
                  />

                  <Input
                    name="supportive_responsible.profission"
                    placeholder="Profissão"
                    icon={FiBriefcase}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.workplace"
                    placeholder="Local de trabalho"
                    icon={FiBriefcase}
                  />

                  <Input
                    name="supportive_responsible.commercial_phone"
                    placeholder="Telefone comercial"
                    icon={FiPhone}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.residencial_phone"
                    placeholder="Telefone residencial"
                    icon={FiPhone}
                  />

                  <Input
                    name="supportive_responsible.personal_phone"
                    placeholder="Telefone pessoal"
                    icon={FiSmartphone}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Checkbox
                    name="config.reaproove_address"
                    label="Utilizar o mesmo endereço do responsável financeiro?"
                    onChange={e => setReuseAddress(e.target.checked)}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.address_cep"
                    placeholder="CEP"
                    icon={FiMapPin}
                    onBlur={e =>
                      handleSearchAddressByCep(e.target.value, 'supportive')
                    }
                  />

                  <Input
                    name="supportive_responsible.address_street"
                    placeholder="Rua"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="number"
                    name="supportive_responsible.address_number"
                    placeholder="Número"
                    icon={FiMapPin}
                  />

                  <Input
                    name="supportive_responsible.address_complement"
                    placeholder="Complemento"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    name="supportive_responsible.address_neighborhood"
                    placeholder="Bairro"
                    icon={FiMapPin}
                  />

                  <Input
                    name="supportive_responsible.address_city"
                    placeholder="Cidade"
                    icon={FiMapPin}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="email"
                    name="supportive_responsible.email"
                    placeholder="E-mail"
                    icon={FiMail}
                  />

                  <Input
                    type="number"
                    name="supportive_responsible.monthly_income"
                    placeholder="Renda mensal"
                    icon={FiDollarSign}
                  />
                </InputGroup>

                <InputGroup displayColumn={window.innerWidth <= 700}>
                  <Input
                    type="date"
                    name="supportive_responsible.birth_date"
                    icon={FiCalendar}
                    label="Data de nascimento"
                  />
                </InputGroup>

                <InputGroup>
                  <File name="supportive_photos.rg_photo" buttonText="RG" />
                </InputGroup>

                <InputGroup>
                  <File name="supportive_photos.cpf_photo" buttonText="CPF" />
                </InputGroup>

                <InputGroup>
                  <File
                    name="supportive_photos.residencial_proof_photo"
                    buttonText="Comprovante de endereço"
                  />
                </InputGroup>
              </>
            )}
          </FormGroup>

          <FormGroup>
            <Heading title="Dados do aluno" />

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Input name="student.name" placeholder="Nome" icon={FiUser} />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Input
                name="student.nacionality"
                placeholder="Nacionalidade"
                icon={FiFlag}
              />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Input
                name="student.birth_city"
                placeholder="Cidade natal"
                icon={FiMapPin}
              />

              <Input
                name="student.birth_state"
                placeholder="Estado natal"
                icon={FiMapPin}
              />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Input
                name="student.father_name"
                placeholder="Nome do pai"
                icon={FiUsers}
              />

              <Input
                name="student.mother_name"
                placeholder="Nome da mãe"
                icon={FiUsers}
              />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Select
                name="student.gender"
                icon={FiInfo}
                optionsArray={genderOptions}
              />

              <Select
                name="student.race"
                icon={FiInfo}
                optionsArray={raceOptions}
              />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Input
                type="date"
                name="student.birth_date"
                icon={FiCalendar}
                label="Data de nascimento"
              />

              <Select
                name="grade.id"
                icon={FiSmile}
                optionsArray={gradeOptions}
              />
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_origin_school"
                label="Selecione uma opção:"
                options={[
                  {
                    id: 'hos1',
                    label: 'Matrícula',
                    value: 'yes',
                  },
                  {
                    id: 'hos2',
                    label: 'Rematrícula',
                    value: 'no',
                    default: true,
                  },
                ]}
                change={value => setShowOriginSchool(value === 'yes')}
              />

              {showOriginSchool && (
                <Input
                  name="student.origin_school"
                  placeholder="Escola de origem"
                  icon={FiMapPin}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_health_plan"
                label="Possui algum plano de saúde?"
                options={[
                  { id: 'hhp1', label: 'Sim', value: 'yes' },
                  { id: 'hhp2', label: 'Não', value: 'no', default: true },
                ]}
                change={value => setShowHealthPlan(value === 'yes')}
              />

              {showHealthPlan && (
                <Input
                  name="student.health_plan"
                  placeholder="Qual?"
                  icon={FiActivity}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_medication_alergy"
                label="Possui alergia a algum medicamento?"
                options={[
                  { id: 'hma1', label: 'Sim', value: 'yes' },
                  { id: 'hma2', label: 'Não', value: 'no', default: true },
                ]}
                change={value => setShowMedicationAlergy(value === 'yes')}
              />

              {showMedicationAlergy && (
                <Input
                  name="student.medication_alergy"
                  placeholder="Qual?"
                  icon={FiActivity}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_food_alergy"
                label="Possui alergia a algum alimento?"
                options={[
                  { id: 'hfa1', label: 'Sim', value: 'yes' },
                  { id: 'hfa2', label: 'Não', value: 'no', default: true },
                ]}
                change={value => setShowFoodAlergy(value === 'yes')}
              />

              {showFoodAlergy && (
                <Input
                  name="student.food_alergy"
                  placeholder="Qual?"
                  icon={FiActivity}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_health_problem"
                label="Possui algum problema de saúde?"
                options={[
                  { id: 'hhpp1', label: 'Sim', value: 'yes' },
                  { id: 'hhpp2', label: 'Não', value: 'no', default: true },
                ]}
                change={value => setShowHealthProblem(value === 'yes')}
              />

              {showHealthProblem && (
                <Input
                  name="student.health_problem"
                  placeholder="Qual?"
                  icon={FiActivity}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.has_special_necessities"
                label="Possui alguma necessidade especial?"
                options={[
                  { id: 'hsn1', label: 'Sim', value: 'yes' },
                  { id: 'hsn2', label: 'Não', value: 'no', default: true },
                ]}
                change={value => setShowSpecialNecessities(value === 'yes')}
              />

              {showSpecialNecessities && (
                <Input
                  name="student.special_necessities"
                  placeholder="Qual?"
                  icon={FiActivity}
                />
              )}
            </InputGroup>

            <InputGroup displayColumn={window.innerWidth <= 700}>
              <Radio
                name="config.student_ease_relating"
                label="Tem facilidade de se relacionar?"
                options={[
                  { id: 'ser1', label: 'Sim', value: 'yes' },
                  { id: 'ser2', label: 'Não', value: 'no', default: true },
                ]}
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.school_records_photo"
                buttonText="Histórico escolar"
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.vaccine_card_photo"
                buttonText="Cartão de vacina"
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.birth_certificate_photo"
                buttonText="Certidão de nascimento"
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.health_plan_photo"
                buttonText="Cartão do plano de saúde"
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.transfer_declaration_photo"
                buttonText="Declaração de transferência"
              />
            </InputGroup>

            <InputGroup>
              <File
                name="student_photos.monthly_declaration_photo"
                buttonText="Declaração de quitação de débito da escola anterior"
              />
            </InputGroup>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">
              Enviar
              <FiArrowRight size={20} />
            </Button>
          </ButtonGroup>
        </Form>
      </Main>
    </Container>
  );
};

export default NewEnrollment;
