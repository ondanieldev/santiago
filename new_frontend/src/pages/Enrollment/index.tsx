import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiUsers,
  FiClipboard,
  FiFlag,
  FiHeart,
  FiBriefcase,
  FiPhone,
  FiSmartphone,
  FiMapPin,
  FiMail,
  FiDollarSign,
  FiFileText,
  FiInfo,
  FiSmile,
  FiActivity,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import {
  Container,
  Main,
  ToggleView,
  ToggleViewHeader,
  ToggleViewForm,
  InputGroup,
  ButtonGroup,
} from './styles';
import IPersonBase from '../../entities/IPerson';
import IStudentBase from '../../entities/IStudent';
import IAgreement from '../../entities/IAgreement';
import IGrade from '../../entities/IGrade';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import FileInputWithPreview from '../../components/FileInputWithPreview';
import api from '../../services/api';
import Checkbox from '../../components/Checkbox';

import 'react-toastify/dist/ReactToastify.css';

interface IPerson extends IPersonBase {
  responsible_type: string;
  showFields?: boolean;
}

interface IStudent extends IStudentBase {
  showFields?: boolean;
}

interface IAprooveOrDisaprooveFormData {
  aproove: boolean;
}

toast.configure();

const Enrollment: React.FC = () => {
  const { id } = useParams() as { id: string };

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [responsibles, setResponsibles] = useState([] as IPerson[]);
  const [student, setStudent] = useState({} as IStudent);
  const [grade, setGrade] = useState({} as IGrade);
  const [comment, setComment] = useState(''); // tmp

  useEffect(() => {
    api.get(`/enrollments/${id}`).then(response => {
      const {
        agreements,
        grade: gradeData,
        student: studentData,
      } = response.data;

      const responsiblesData = [] as IPerson[];

      agreements.forEach((agreement: IAgreement) => {
        const { person, responsible_type } = agreement;
        const responsible = { ...person } as IPerson;
        responsible.responsible_type = responsible_type;
        responsible.showFields = false;
        responsiblesData.push(responsible);
      });

      studentData.showFields = false;

      setResponsibles(responsiblesData);

      setStudent(studentData);

      setGrade(gradeData);
    });
  }, [id]);

  const handleToggleResponsibleFields = useCallback(
    (responsible_id: string) => {
      const responsiblesData = [...responsibles];

      const responsible = responsiblesData.find(
        item => item.id === responsible_id,
      );
      if (responsible) {
        responsible.showFields = !responsible.showFields;
      }

      setResponsibles(responsiblesData);
    },
    [responsibles],
  );

  const handleToggleStudentFields = useCallback(() => {
    const studentData = { ...student };

    student.showFields = !student.showFields;

    setStudent(studentData);
  }, [student]);

  const handleAprooveOrDisaproove = useCallback(
    ({ aproove }: IAprooveOrDisaprooveFormData) => {
      api
        .put(`/enrollments/${id}`, {
          aproove,
          comment,
        })
        .then(() => {
          aproove
            ? toast.success('Matrícula aprovada com sucesso!')
            : toast.success('Matrícula reprovada com sucesso!');

          history.push('/');
        })
        .catch(() => {
          toast.error('Erro ao validar matrícula!');
        });
    },
    [id, comment, history],
  );

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Validar matrícula" />

        <Form ref={formRef} onSubmit={() => console.log('a')}>
          {responsibles.map(responsible => (
            <ToggleView key={responsible.id}>
              <ToggleViewHeader>
                <Button
                  type="button"
                  onClick={() => handleToggleResponsibleFields(responsible.id)}
                >
                  {responsible.showFields ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </Button>

                <h2>Responsável {responsible.name}</h2>
              </ToggleViewHeader>

              {responsible.showFields && (
                <ToggleViewForm>
                  <InputGroup>
                    <Input
                      name={`${responsible.id}-name`}
                      placeholder="Nome"
                      icon={FiUser}
                      defaultValue={responsible.name}
                    />

                    <Select
                      name={`${responsible.id}-responsible_type`}
                      icon={FiFileText}
                      defaultValue={responsible.responsible_type}
                    >
                      <option value="financial">Financeiro</option>
                      <option value="supportive">Solidário</option>
                      <option value="educational">Escolar</option>
                    </Select>
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-rg`}
                      placeholder="RG"
                      icon={FiClipboard}
                      defaultValue={responsible.rg}
                    />

                    <Input
                      name={`${responsible.id}-cpf`}
                      placeholder="CPF"
                      icon={FiClipboard}
                      defaultValue={responsible.cpf}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-nacionality`}
                      placeholder="Nacionalidade"
                      icon={FiFlag}
                      defaultValue={responsible.nacionality}
                    />

                    <Input
                      name={`${responsible.id}-civil_state`}
                      placeholder="Estado civil"
                      icon={FiHeart}
                      defaultValue={responsible.civil_state}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-education_level`}
                      placeholder="Grau de instrução"
                      icon={FiInfo}
                      defaultValue={responsible.education_level}
                    />

                    <Input
                      name={`${responsible.id}-profission`}
                      placeholder="Profissão"
                      icon={FiBriefcase}
                      defaultValue={responsible.profission}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-workplace`}
                      placeholder="Local de trabalho"
                      icon={FiBriefcase}
                      defaultValue={responsible.workplace}
                    />

                    <Input
                      name={`${responsible.id}-commercial_phone`}
                      placeholder="Telefone comercial"
                      icon={FiPhone}
                      defaultValue={responsible.commercial_phone}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-residencial_phone`}
                      placeholder="Telefone residencial"
                      icon={FiPhone}
                      defaultValue={responsible.residencial_phone}
                    />

                    <Input
                      name={`${responsible.id}-personal_phone`}
                      placeholder="Telefone pessoal"
                      icon={FiSmartphone}
                      defaultValue={responsible.personal_phone}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-address_street`}
                      placeholder="Rua"
                      icon={FiMapPin}
                      defaultValue={responsible.address_street}
                    />

                    <Input
                      name={`${responsible.id}-address_number`}
                      type="number"
                      placeholder="Número"
                      icon={FiMapPin}
                      defaultValue={responsible.address_number}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-address_complement`}
                      placeholder="Complemento"
                      icon={FiMapPin}
                      defaultValue={responsible.address_complement}
                    />

                    <Input
                      name={`${responsible.id}-address_neighborhood`}
                      placeholder="Bairro"
                      icon={FiMapPin}
                      defaultValue={responsible.address_neighborhood}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-address_city`}
                      placeholder="Cidade"
                      icon={FiMapPin}
                      defaultValue={responsible.address_city}
                    />

                    <Input
                      name={`${responsible.id}-address_cep`}
                      placeholder="CEP"
                      icon={FiMapPin}
                      defaultValue={responsible.address_cep}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Input
                      name={`${responsible.id}-email`}
                      type="email"
                      placeholder="E-mail"
                      icon={FiMail}
                      defaultValue={responsible.email}
                    />

                    <Input
                      name={`${responsible.id}-monthly_income`}
                      type="number"
                      placeholder="Renda mensal"
                      icon={FiDollarSign}
                      defaultValue={responsible.monthly_income}
                    />
                  </InputGroup>

                  <InputGroup>
                    <Checkbox
                      name={`${responsible.id}-income_tax`}
                      label="Declara imposto de renda?"
                      defaultChecked={responsible.income_tax}
                    />
                  </InputGroup>

                  <InputGroup>
                    <FileInputWithPreview
                      name={`${responsible.id}-rg_photo`}
                      buttonText="RG"
                      defaultValue={responsible.rg_photo}
                    />
                  </InputGroup>

                  <InputGroup>
                    <FileInputWithPreview
                      name={`${responsible.id}-cpf_photo`}
                      buttonText="CPF"
                      defaultValue={responsible.cpf_photo}
                    />
                  </InputGroup>

                  <InputGroup>
                    <FileInputWithPreview
                      name={`${responsible.id}-residencial_proof_photo`}
                      buttonText="Comprovante de Residência"
                      defaultValue={responsible.residencial_proof_photo}
                    />
                  </InputGroup>
                </ToggleViewForm>
              )}
            </ToggleView>
          ))}

          <ToggleView>
            <ToggleViewHeader>
              <Button type="button" onClick={handleToggleStudentFields}>
                {student.showFields ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </Button>

              <h2>Aluno {student.name}</h2>
            </ToggleViewHeader>

            {student.showFields && (
              <ToggleViewForm>
                <InputGroup>
                  <Input
                    name="name"
                    placeholder="Nome"
                    icon={FiUser}
                    defaultValue={student.name}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="nacionality"
                    placeholder="Nacionalidade"
                    icon={FiFlag}
                    defaultValue={student.nacionality}
                  />

                  <Input
                    name="birth_city"
                    placeholder="Cidade natal"
                    icon={FiMapPin}
                    defaultValue={student.birth_city}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="birth_state"
                    placeholder="Estado natal"
                    icon={FiMapPin}
                    defaultValue={student.birth_state}
                  />

                  <Input
                    name="origin_school"
                    placeholder="Escola de origem"
                    icon={FiMapPin}
                    defaultValue={student.origin_school}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="father_name"
                    placeholder="Nome do pai"
                    icon={FiUsers}
                    defaultValue={student.father_name}
                  />

                  <Input
                    name="mother_name"
                    placeholder="Nome da mãe"
                    icon={FiUsers}
                    defaultValue={student.mother_name}
                  />
                </InputGroup>

                <InputGroup>
                  <Select
                    name="grade_id"
                    icon={FiSmile}
                    defaultValue={grade.id}
                  >
                    <option value="null">Turma</option>
                    <option value={grade.id}>
                      {grade.name} - {grade.year}
                    </option>
                    {/* {grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {`${grade.name} - ${grade.year}`}
                </option>
              ))} */}
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Select
                    name="gender"
                    icon={FiInfo}
                    defaultValue={student.gender}
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </Select>

                  <Select name="race" icon={FiInfo} defaultValue={student.race}>
                    <option value="white">Branco</option>
                    <option value="brown">Pardo</option>
                    <option value="black">Negro</option>
                    <option value="indigenous">Indígena</option>
                    <option value="yellow">Amarelo</option>
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Input
                    name="health_plan"
                    placeholder="Qual?"
                    icon={FiActivity}
                    defaultValue={student.health_plan}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="medication_alergy"
                    placeholder="Qual?"
                    icon={FiActivity}
                    defaultValue={student.medication_alergy}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="food_alergy"
                    placeholder="Qual?"
                    icon={FiActivity}
                    defaultValue={student.food_alergy}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="health_problem"
                    placeholder="Qual?"
                    icon={FiActivity}
                    defaultValue={student.health_problem}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    name="special_necessities"
                    placeholder="Qual?"
                    icon={FiActivity}
                    defaultValue={student.special_necessities}
                  />
                </InputGroup>

                <InputGroup>
                  <Checkbox
                    name="ease_relating"
                    label="Tem facilidade de se relacionar?"
                    defaultChecked={student.ease_relating}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="school_records_photo"
                    buttonText="Histórico escolar"
                    defaultValue={student.school_records_photo}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="vaccine_card_photo"
                    buttonText="Cartão de vacina"
                    defaultValue={student.vaccine_card_photo}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="birth_certificate_photo"
                    buttonText="Certidão de nascimento"
                    defaultValue={student.birth_certificate_photo}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="health_plan_photo"
                    buttonText="Cartão do plano de saúde"
                    defaultValue={student.health_plan_photo}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="transfer_declaration_photo"
                    buttonText="Declaração de transferência"
                    defaultValue={student.transfer_declaration_photo}
                  />
                </InputGroup>

                <InputGroup>
                  <FileInputWithPreview
                    name="monthly_declaration_photo"
                    buttonText="Declaração de pagamento de mensalidade"
                    defaultValue={student.monthly_declaration_photo}
                  />
                </InputGroup>
              </ToggleViewForm>
            )}
          </ToggleView>

          <InputGroup>
            <Input
              name="comment"
              icon={FiInfo}
              placeholder="Comente sobre a aprovação/desaprovação"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </InputGroup>
        </Form>

        <ButtonGroup>
          <Button
            type="button"
            backgroundColor="#f44336"
            onClick={() => handleAprooveOrDisaproove({ aproove: false })}
          >
            Reprovar
          </Button>

          <Button
            type="button"
            backgroundColor="#4caf50"
            onClick={() => handleAprooveOrDisaproove({ aproove: true })}
          >
            Aprovar
          </Button>
        </ButtonGroup>
      </Main>
    </Container>
  );
};

export default Enrollment;
