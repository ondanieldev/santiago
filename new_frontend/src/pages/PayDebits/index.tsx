import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiDollarSign } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import { Container, Main, InputGroup, Debit } from './styles';
import { paymentMethods } from '../../utils/defaults';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import Table from '../../components/Table';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Select from '../../components/SelectInput';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import Document from '../../components/Document';
import IDebit from '../../entities/IDebit';
import IPayment from '../../entities/IPayment';
import api from '../../services/api';
import paymentSchema from '../../schemas/paymentSchema';
import getValidationErrors from '../../utils/getValidationErrors';

interface IFormData {
  method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';
}

interface IParams {
  contract_id: string;
}

toast.configure();

const Debits: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { contract_id } = useParams<IParams>();

  const [debits, setDebits] = useState([] as IDebit[]);
  const [selectedDebit, setSelectedDebit] = useState({} as IDebit);
  const [payment, setPayment] = useState({} as IPayment);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get(`contracts/${contract_id}/debits`)
      .then(response => {
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
  }, [contract_id]);

  const handlePayDebit = useCallback(
    async (data: IFormData) => {
      if (loadingSubmit) {
        return;
      }

      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        await paymentSchema.validate(data, {
          abortEarly: false,
        });

        const apiUrl =
          selectedDebit.type === 'enrollment'
            ? '/payments/enrollment'
            : '/payments';

        const response = await api.post(apiUrl, {
          debit_id: selectedDebit.id,
          method: data.method,
        });

        const paymentData = response.data as IPayment;

        setPayment(paymentData);

        const debitsList = debits;

        debitsList.forEach(debit => {
          if (debit.id === selectedDebit.id) {
            debit.paid = true;
            // debit.payment.receipt_url = paymentData.receipt_url;
          }
        });

        setDebits(debitsList);

        toast.success('Débito pago com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response) {
          toast.error(`Erro ao pagar débito: ${err.response.data.message}`);
        } else {
          toast.error(
            `Erro ao pagar débito! Por favor, tente novamente mais tarde.`,
          );
        }
      } finally {
        setLoadingSubmit(false);
      }
    },
    [selectedDebit, debits, loadingSubmit],
  );

  const handleClosePopup = useCallback(() => {
    setSelectedDebit({} as IDebit);
    setPayment({} as IPayment);
  }, []);

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title title="Pagar débitos" subtitle={`Contrato #${contract_id}`} />

        <Table
          isVoid={debits.length <= 0}
          voidMessage="Não há débitos para serem pagos!"
        >
          <thead>
            <tr>
              <td>Valor</td>
              <td>Descrição</td>
              <td>Data limite do desconto</td>
              <td>Data limite do pagamento</td>
              <td>Data de pagamento</td>
            </tr>
          </thead>
          <tbody>
            {debits.map(debit => (
              <Debit
                paid={debit.paid}
                key={debit.id}
                onClick={() => setSelectedDebit(debit)}
              >
                <td>{debit.value}</td>
                <td>{debit.description}</td>
                <td>{debit.dicount_limit_date}</td>
                <td>{debit.payment_limit_date}</td>
                <td>{debit.payday ? debit.payday : '-'}</td>
              </Debit>
            ))}
          </tbody>
        </Table>

        {!!selectedDebit.id && (
          <Popup
            title={`Débito: R$ ${selectedDebit.value}`}
            handleClosePopup={handleClosePopup}
          >
            {!payment.id && !selectedDebit.paid && (
              <Form ref={formRef} onSubmit={handlePayDebit}>
                <InputGroup>
                  <Select
                    name="method"
                    icon={FiDollarSign}
                    optionsArray={paymentMethods}
                  />
                </InputGroup>

                <Button type="submit" loading={loadingSubmit}>
                  Pagar
                </Button>
              </Form>
            )}

            {(payment.receipt_url ||
              (selectedDebit.payment && selectedDebit.payment.receipt_url)) && (
              <Document
                name="Recibo"
                link={
                  payment.receipt_url || selectedDebit.payment.receipt_url || ''
                }
              />
            )}
          </Popup>
        )}
      </Main>
    </Container>
  );
};

export default Debits;
