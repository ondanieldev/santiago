import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiPercent,
  FiEdit2,
  FiTrash,
  FiCheck,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { isPast, differenceInCalendarMonths, parseISO } from 'date-fns';

import {
  Container,
  Main,
  InputGroup,
  Debit,
  FormGroup,
  ButtonGroup,
  ActionGroup,
  WarnMessage,
} from './styles';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import Table from '../../components/Table';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import IDebit from '../../entities/IDebit';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { prettyDate, formatCoin } from '../../utils/formatFunctions';

interface IFormData {
  method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';
}

interface IDebitWithVariation extends IDebit {
  true_value?: number;
}

interface IParams {
  contract_id: string;
}

interface IFormData {
  description: string;
  discount: number;
  payment_limit_date: Date;
  select_all: boolean;
  value: number;
}

const ExtraDebitsByContract: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { contract_id } = useParams<IParams>();

  const [debits, setDebits] = useState([] as IDebitWithVariation[]);
  const [selectedEditDebit, setSelectedEditDebit] = useState('');
  const [selectedDeleteDebit, setSelectedDeleteDebit] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const handleSelectEditExtraDebit = useCallback(
    (debit: IDebitWithVariation) => {
      setSelectedEditDebit(debit.id);

      formRef.current?.setErrors({});

      formRef.current?.setFieldValue('description', debit.description);
      formRef.current?.setFieldValue('value', debit.value);
      formRef.current?.setFieldValue('discount', debit.discount);
      formRef.current?.setFieldValue(
        'payment_limit_date',
        debit.payment_limit_date,
      );
    },
    [],
  );

  const handleUnselectExtraDebit = useCallback(() => {
    setSelectedEditDebit('');
    setSelectedDeleteDebit('');

    formRef.current?.setErrors({});
    formRef.current?.reset();
  }, []);

  const handleSelectDeleteExtraDebit = useCallback((deibt_id: string) => {
    setSelectedDeleteDebit(deibt_id);
  }, []);

  const calcTrueValue = useCallback((debit: IDebitWithVariation): number => {
    const parsedDebitDate = parseISO(debit.payment_limit_date.toString());

    let true_value = debit.value;

    if (isPast(parsedDebitDate)) {
      const months = differenceInCalendarMonths(new Date(), parsedDebitDate);

      true_value = debit.value * 1.03 ** months;
    } else {
      true_value = debit.value - (debit.value * debit.discount) / 100;
    }

    return true_value;
  }, []);

  const handleEditExtraDebit = useCallback(
    async ({ description, discount, payment_limit_date, value }: IFormData) => {
      try {
        setLoadingSubmit(true);

        formRef.current?.setErrors({});

        const validateFormData = Yup.object().shape({
          description: Yup.string().required('Descrião obrigatória'),
          discount: Yup.number().typeError(
            () => 'Desconto precisa ser numérico',
          ),
          payment_limit_date: Yup.date()
            .typeError(() => 'Deata inválida')
            .required(),
          value: Yup.number()
            .typeError(() => 'O valor precisa ser numérico')
            .required(),
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

        const response = await api.put(`/debits/extra/${selectedEditDebit}`, {
          description,
          discount,
          payment_limit_date,
          value,
        });

        const updatedDebit = response.data as IDebitWithVariation;

        const true_value = calcTrueValue(updatedDebit);

        Object.assign(updatedDebit, { true_value });

        const debitsWithoutUpdated = debits.filter(
          debit => debit.id !== selectedEditDebit,
        );

        setDebits([...debitsWithoutUpdated, updatedDebit]);

        formRef.current?.reset();

        setSelectedEditDebit('');

        toast.success('Débito editado com sucesso!');
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
          toast.error(`Erro ao editar débito: ${err.response.data.message}`);
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [selectedEditDebit, calcTrueValue, debits],
  );

  const handleClosePopup = useCallback(() => {
    setSelectedDeleteDebit('');
  }, []);

  const handleDeleteExtraDebit = useCallback(async () => {
    try {
      setLoadingSubmit(true);

      await api.delete(`/debits/extra/${selectedDeleteDebit}`);

      setSelectedDeleteDebit('');

      const debitsWithoutDeleted = debits.filter(
        debit => debit.id !== selectedDeleteDebit,
      );

      setDebits(debitsWithoutDeleted);

      toast.success('Débito excluído com sucesso!');
    } catch (err) {
      if (err.response) {
        toast.error(`Erro ao excluir débito: ${err.response.data.message}`);
      } else {
        toast.error(
          'Erro interno do servidor! Por favor, tente novamente mais tarde.',
        );
      }
    }
  }, [selectedDeleteDebit, debits]);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get(`contracts/${contract_id}/debits/extra`)
      .then(response => {
        const debitsFromApi = response.data;

        debitsFromApi.forEach((debit: IDebitWithVariation) => {
          const true_value = calcTrueValue(debit);

          Object.assign(debit, { true_value });
        });

        setDebits(response.data);
      })
      .catch(() => {
        toast.error(
          'Erro ao carregar débitos! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [contract_id, calcTrueValue]);

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title
          title="Gerenciar débitos adicionais"
          subtitle={`Contrato #${contract_id}`}
        />

        <Form ref={formRef} onSubmit={handleEditExtraDebit}>
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

            {selectedEditDebit && (
              <ButtonGroup>
                <Button type="submit" loading={loadingSubmit}>
                  Editar
                </Button>

                <Button
                  type="button"
                  backgroundColor="#f44336"
                  onClick={handleUnselectExtraDebit}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            )}
          </FormGroup>
        </Form>

        <Table
          isVoid={debits.length <= 0}
          voidMessage="Não há débitos para serem pagos!"
        >
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Valor</td>
              <td>Valor com variação</td>
              <td>Data limite do pagamento</td>
              <td>Ações</td>
            </tr>
          </thead>
          <tbody>
            {debits.map(debit => (
              <Debit paid={debit.paid} key={debit.id}>
                <td>{debit.description}</td>
                <td>{formatCoin(debit.value)}</td>
                <td>
                  {typeof debit.true_value === 'number'
                    ? formatCoin(debit.true_value)
                    : debit.value}
                </td>
                <td>{prettyDate(debit.payment_limit_date)}</td>
                <td>
                  <ActionGroup>
                    <FiEdit2
                      onClick={() => handleSelectEditExtraDebit(debit)}
                      size={20}
                      color="#212529"
                    />

                    <FiTrash
                      onClick={() => handleSelectDeleteExtraDebit(debit.id)}
                      size={20}
                      color="#f44336"
                    />
                  </ActionGroup>
                </td>
              </Debit>
            ))}
          </tbody>
        </Table>

        {selectedDeleteDebit && (
          <Popup title="Deletar débito" handleClosePopup={handleClosePopup}>
            <Form onSubmit={handleDeleteExtraDebit}>
              <WarnMessage>
                <strong> ATENÇÃO: </strong>
                esta ação não pode ser desfeita! Digite
                <b> CONFIRMAR </b>
                para deletar o débito.
              </WarnMessage>

              <InputGroup>
                <Input
                  name="confirm_message"
                  icon={FiCheck}
                  value={confirmMessage}
                  onChange={e => setConfirmMessage(e.target.value)}
                />
              </InputGroup>

              <ButtonGroup>
                <Button
                  disabled={confirmMessage !== 'CONFIRMAR'}
                  type="submit"
                  loading={loadingSubmit}
                  backgroundColor="#f44336"
                >
                  Deletar
                </Button>
              </ButtonGroup>
            </Form>
          </Popup>
        )}
      </Main>
    </Container>
  );
};

export default ExtraDebitsByContract;
