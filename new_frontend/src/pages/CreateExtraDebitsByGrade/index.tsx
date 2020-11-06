import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import {
  FiFileText,
  FiDollarSign,
  FiPercent,
  FiCalendar,
} from 'react-icons/fi';

import {
  Container,
  Main,
  ContractsList,
  Contract,
  FormGroup,
  InputGroup,
} from './styles';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import IContract from '../../entities/IContract';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface IParams {
  grade_id: string;
}

interface IContractProps extends IContract {
  selected?: boolean;
}

interface IFormContracts {
  [key: string]: boolean;
}

interface IFormData {
  description: string;
  discount: number;
  payment_limit_date: Date;
  select_all: boolean;
  value: number;
  apply_interest_rules: boolean;
  contracts_ids: IFormContracts;
}

const CreateExtraDebitMenu: React.FC = () => {
  const [contracts, setContracts] = useState<IContractProps[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { grade_id } = useParams<IParams>();

  const handleSubmitForm = useCallback(
    async ({
      contracts_ids,
      description,
      discount,
      payment_limit_date,
      value,
      apply_interest_rules,
    }: IFormData) => {
      try {
        setLoadingSubmit(true);

        formRef.current?.setErrors({});

        const validateFormData = Yup.object().shape({
          description: Yup.string().required('Descrião obrigatória'),
          discount: Yup.number().typeError(
            () => 'Desconto precisa ser numérico',
          ),
          payment_limit_date: Yup.date()
            .typeError(() => 'Data inválida')
            .required('Data obrigatória'),
          value: Yup.number()
            .typeError(() => 'O valor precisa ser numérico')
            .required('Valor obrigatório'),
        });

        await validateFormData.validate(
          {
            description,
            discount,
            payment_limit_date,
            value,
          },
          { abortEarly: false },
        );

        const selectedContracts = Object.entries(contracts_ids);

        const promises = [] as Promise<AxiosResponse>[];

        selectedContracts.forEach(([contract_id, selected]) => {
          if (selected) {
            promises.push(
              api.post('/debits/extra', {
                contract_id,
                description,
                discount,
                payment_limit_date,
                value,
                apply_interest_rules,
              }),
            );
          }
        });

        await Promise.all(promises);

        formRef.current?.reset();

        toast.success('Débitos criados com sucesso!');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          toast.error(
            'Oops... alguns dados não foram preenchidos corretamente!',
          );
          return;
        }

        if (err.response) {
          toast.error(`Erro ao criar débito: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [],
  );

  const handleToggleAll = useCallback(
    (state: HTMLInputElement) => {
      contracts.forEach(contract => {
        formRef.current?.setFieldValue(
          `contracts_ids.${contract.id}`,
          !!state.checked,
        );
      });
    },
    [contracts],
  );

  useEffect(() => {
    api
      .get(`/contracts/active/grades/${grade_id}`)
      .then(response => {
        const contractsFromApi = response.data as IContractProps[];

        setContracts(contractsFromApi);
      })
      .catch(() => {
        toast.error(
          'Erro ao buscar dados do servidor! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [grade_id]);

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title
          title="Criar débitos adicionais"
          subtitle="Preencha os dados do débito e selecione as matrículas em que serão aplicados"
        />

        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <FormGroup>
            <InputGroup>
              <Input
                icon={FiFileText}
                name="description"
                placeholder="Descrição"
              />

              <Input
                icon={FiDollarSign}
                type="number"
                step="0.01"
                name="value"
                placeholder="Valor"
              />
            </InputGroup>

            <InputGroup>
              <Input
                icon={FiPercent}
                type="number"
                step="0.01"
                name="discount"
                placeholder="Desconto"
              />

              <Input
                icon={FiCalendar}
                type="date"
                name="payment_limit_date"
                label="Data limite de pagamento"
              />
            </InputGroup>

            <InputGroup>
              <Checkbox
                name="apply_interest_rules"
                label="Aplicar regras de juros"
              />
            </InputGroup>
          </FormGroup>

          <ContractsList>
            <Checkbox
              name="select_all"
              label="Selecionar todos"
              onClick={e => handleToggleAll(e.target as HTMLInputElement)}
            />

            {contracts.map(contract => (
              <Contract key={contract.id}>
                <Checkbox
                  name={`contracts_ids.${contract.id}`}
                  label={contract.student.name}
                />
              </Contract>
            ))}
          </ContractsList>

          <Button loading={loadingSubmit} type="submit">
            Criar
          </Button>
        </Form>
      </Main>
    </Container>
  );
};

export default CreateExtraDebitMenu;
