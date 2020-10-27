import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  Main,
  DataGroup,
  TitleContainer,
  ButtonGroup,
} from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import Input from '../../components/Input';
import Button from '../../components/Button';
import IEnrollment from '../../entities/IEnrollment';
import api from '../../services/api';
import {
  prettyDate,
  formatEducationLevel,
  formatGender,
  formatRace,
} from '../../utils/formatFunctions';

interface IParams {
  contract_id: string;
}

const Enrollment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const params = useParams<IParams>();
  const history = useHistory();

  const [enrollment, setEnrollment] = useState({} as IEnrollment);
  const [showFinancialData, setshowFinancialData] = useState(true);
  const [showSupportiveData, setshowSupportiveData] = useState(true);
  const [showStudentData, setshowStudentData] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmitForm = useCallback(
    async (status: 'aproove' | 'disaproove') => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        const { contract_id } = params;

        const comment = formRef.current?.getFieldValue('comment');

        api.patch(`/contracts/${contract_id}/${status}`, {
          comment,
          responsible_email: enrollment.agreements[0].person.email,
          responsible_name: enrollment.agreements[0].person.name,
        });

        toast.success(
          `Contrato ${
            status === 'aproove' ? 'aprovado' : 'reprovado'
          } com sucesso! O responsável será notificado.`,
        );

        history.push('dashboard');
      } catch (err) {
        if (err.response) {
          toast.error(
            `Erro ao validar matrícula: ${err.response.data.message}`,
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
    [enrollment, params, history, loadingSubmit],
  );

  const handleEditEnrollment = useCallback(() => {
    const { contract_id } = params;

    history.push(`/edit-enrollment/${contract_id}`);
  }, [params, history]);

  useEffect(() => {
    setLoadingPage(true);

    const { contract_id } = params;

    api
      .get(`/contracts/${contract_id}`)
      .then(response => {
        setEnrollment(response.data);
      })
      .catch(() => {
        toast.error(
          'Erro ao carregar dados da matrícula! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [params]);

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <TitleContainer>
          <Title
            title="Validar matrícula"
            subtitle="Analise os dados e aprove ou desaprove a matrícula"
          />

          <Button type="button" onClick={handleEditEnrollment}>
            Editar dados
          </Button>
        </TitleContainer>

        {enrollment &&
          enrollment.agreements &&
          enrollment.agreements.length === 2 &&
          enrollment.student && (
            <>
              <DataGroup>
                <Heading
                  showIcon
                  title="Responsável financeiro"
                  showData={showFinancialData}
                  onClick={() => setshowFinancialData(!showFinancialData)}
                />

                {showFinancialData && (
                  <Table>
                    <tbody>
                      <tr>
                        <td>Nome</td>
                        <td>{enrollment.agreements[0].person.name}</td>
                      </tr>
                      <tr>
                        <td>Data de nascimento</td>
                        <td>
                          {prettyDate(
                            enrollment.agreements[0].person.birth_date,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Nacionalidade</td>
                        <td>{enrollment.agreements[0].person.nacionality}</td>
                      </tr>
                      <tr>
                        <td>Estado civil</td>
                        <td>{enrollment.agreements[0].person.civil_state}</td>
                      </tr>
                      <tr>
                        <td>Profissão</td>
                        <td>{enrollment.agreements[0].person.profission}</td>
                      </tr>
                      <tr>
                        <td>CPF</td>
                        <td>{enrollment.agreements[0].person.cpf}</td>
                      </tr>
                      <tr>
                        <td>RG</td>
                        <td>{enrollment.agreements[0].person.rg}</td>
                      </tr>
                      <tr>
                        <td>Endereço</td>
                        <td>{`${enrollment.agreements[0].person.address_street} - ${enrollment.agreements[0].person.address_number} ${enrollment.agreements[0].person.address_complement} - ${enrollment.agreements[0].person.address_neighborhood} - ${enrollment.agreements[0].person.address_city}`}</td>
                      </tr>
                      <tr>
                        <td>CEP</td>
                        <td>{enrollment.agreements[0].person.address_cep}</td>
                      </tr>
                      <tr>
                        <td>Telefone residencial</td>
                        <td>
                          {enrollment.agreements[0].person.residencial_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Telefone comercial</td>
                        <td>
                          {enrollment.agreements[0].person.commercial_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Telefone pesssoal</td>
                        <td>
                          {enrollment.agreements[0].person.personal_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Grau de escolaridade</td>
                        <td>
                          {formatEducationLevel(
                            enrollment.agreements[0].person.education_level,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Local de trabalho</td>
                        <td>{enrollment.agreements[0].person.workplace}</td>
                      </tr>
                      <tr>
                        <td>Renda mensal</td>
                        <td>
                          {enrollment.agreements[0].person.monthly_income}
                        </td>
                      </tr>
                      <tr>
                        <td>Declara imposto de renda?</td>
                        <td>
                          {enrollment.agreements[0].person.income_tax
                            ? 'Sim'
                            : 'Não'}
                        </td>
                      </tr>
                      <tr>
                        <td>E-mail</td>
                        <td>{enrollment.agreements[0].person.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </DataGroup>

              <DataGroup>
                <Heading
                  showIcon
                  title="Responsável solidário"
                  showData={showSupportiveData}
                  onClick={() => setshowSupportiveData(!showSupportiveData)}
                />

                {showSupportiveData && (
                  <Table>
                    <tbody>
                      <tr>
                        <td>Nome</td>
                        <td>{enrollment.agreements[1].person.name}</td>
                      </tr>
                      <tr>
                        <td>Data de nascimento</td>
                        <td>
                          {prettyDate(
                            enrollment.agreements[1].person.birth_date,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Nacionalidade</td>
                        <td>{enrollment.agreements[1].person.nacionality}</td>
                      </tr>
                      <tr>
                        <td>Estado civil</td>
                        <td>{enrollment.agreements[1].person.civil_state}</td>
                      </tr>
                      <tr>
                        <td>Profissão</td>
                        <td>{enrollment.agreements[1].person.profission}</td>
                      </tr>
                      <tr>
                        <td>CPF</td>
                        <td>{enrollment.agreements[1].person.cpf}</td>
                      </tr>
                      <tr>
                        <td>RG</td>
                        <td>{enrollment.agreements[1].person.rg}</td>
                      </tr>
                      <tr>
                        <td>Endereço</td>
                        <td>{`${enrollment.agreements[1].person.address_street} - ${enrollment.agreements[1].person.address_number} ${enrollment.agreements[1].person.address_complement} - ${enrollment.agreements[1].person.address_neighborhood} - ${enrollment.agreements[1].person.address_city}`}</td>
                      </tr>
                      <tr>
                        <td>CEP</td>
                        <td>{enrollment.agreements[1].person.address_cep}</td>
                      </tr>
                      <tr>
                        <td>Telefone residencial</td>
                        <td>
                          {enrollment.agreements[1].person.residencial_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Telefone comercial</td>
                        <td>
                          {enrollment.agreements[1].person.commercial_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Telefone pesssoal</td>
                        <td>
                          {enrollment.agreements[1].person.personal_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Grau de escolaridade</td>
                        <td>
                          {formatEducationLevel(
                            enrollment.agreements[1].person.education_level,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Local de trabalho</td>
                        <td>{enrollment.agreements[1].person.workplace}</td>
                      </tr>
                      <tr>
                        <td>Renda mensal</td>
                        <td>
                          {enrollment.agreements[1].person.monthly_income}
                        </td>
                      </tr>
                      <tr>
                        <td>E-mail</td>
                        <td>{enrollment.agreements[1].person.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </DataGroup>

              <DataGroup>
                <Heading
                  showIcon
                  title="Aluno"
                  showData={showStudentData}
                  onClick={() => setshowStudentData(!showStudentData)}
                />

                {showStudentData && (
                  <Table>
                    <tbody>
                      <tr>
                        <td>Nome</td>
                        <td>{enrollment.student.name}</td>
                      </tr>
                      <tr>
                        <td>Nome do pai</td>
                        <td>{enrollment.student.father_name}</td>
                      </tr>
                      <tr>
                        <td>Nome da mãe</td>
                        <td>{enrollment.student.mother_name}</td>
                      </tr>
                      <tr>
                        <td>Data de nascimento</td>
                        <td>{prettyDate(enrollment.student.birth_date)}</td>
                      </tr>
                      <tr>
                        <td>Nacionalidade</td>
                        <td>{enrollment.student.nacionality}</td>
                      </tr>
                      <tr>
                        <td>Cidade natal</td>
                        <td>{enrollment.student.birth_city}</td>
                      </tr>
                      <tr>
                        <td>Estado natal</td>
                        <td>{enrollment.student.birth_state}</td>
                      </tr>
                      <tr>
                        <td>Gênero</td>
                        <td>{formatGender(enrollment.student.gender)}</td>
                      </tr>
                      <tr>
                        <td>Raça</td>
                        <td>{formatRace(enrollment.student.race)}</td>
                      </tr>
                      <tr>
                        <td>Facilidade em se relacionar</td>
                        <td>
                          {enrollment.student.ease_relating ? 'Sim' : 'Não'}
                        </td>
                      </tr>
                      {enrollment.student.origin_school && (
                        <tr>
                          <td>Escola de origem</td>
                          <td>{enrollment.student.origin_school}</td>
                        </tr>
                      )}
                      {enrollment.student.health_plan && (
                        <tr>
                          <td>Plano de saúde</td>
                          <td>{enrollment.student.health_plan}</td>
                        </tr>
                      )}
                      {enrollment.student.food_alergy && (
                        <tr>
                          <td>Alergia a alimentos</td>
                          <td>{enrollment.student.food_alergy}</td>
                        </tr>
                      )}
                      {enrollment.student.medication_alergy && (
                        <tr>
                          <td>Alergia a medicamentos</td>
                          <td>{enrollment.student.medication_alergy}</td>
                        </tr>
                      )}
                      {enrollment.student.health_problem && (
                        <tr>
                          <td>Problema de sáude</td>
                          <td>{enrollment.student.health_problem}</td>
                        </tr>
                      )}
                      {enrollment.student.special_necessities && (
                        <tr>
                          <td>Necessidades especiais</td>
                          <td>{enrollment.student.special_necessities}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                )}
              </DataGroup>
            </>
          )}
        <Form ref={formRef} onSubmit={() => {}}>
          <Input name="comment" placeholder="Comentário opcional" />

          <ButtonGroup>
            <Button
              type="button"
              onClick={() => handleSubmitForm('disaproove')}
              backgroundColor="#f44336"
              loading={loadingSubmit}
            >
              Desaprovar
            </Button>

            <Button
              type="button"
              onClick={() => handleSubmitForm('aproove')}
              backgroundColor="#4caf50"
              loading={loadingSubmit}
            >
              Aprovar
            </Button>
          </ButtonGroup>
        </Form>
      </Main>
    </Container>
  );
};

export default Enrollment;
