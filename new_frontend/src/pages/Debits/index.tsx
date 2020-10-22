import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiDollarSign } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Container, Main, InputGroup, Debit } from './styles';
import { paymentMethods } from '../../utils/defaults';
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

  useEffect(() => {
    api.get(`contracts/${contract_id}/debits`).then(response => {
      setDebits(response.data);
    });
  }, [contract_id]);

  const handlePayDebit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        await paymentSchema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/payments/enrollment', {
          debit_id: selectedDebit.id,
          method: data.method,
        });

        const paymentData = response.data as IPayment;

        setPayment(paymentData);

        const debitsWithoutUpdated = debits.filter(
          debit => debit.id !== selectedDebit.id,
        );

        const updateDebit = selectedDebit;

        Object.assign(updateDebit, { paid: true });

        setDebits([...debitsWithoutUpdated, updateDebit]);

        toast.success('Débito pago com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('Erro interno do servidor!');
      }
    },
    [selectedDebit, debits],
  );

  return (
    <Container>
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
              <td>Data inicial</td>
              <td>Data final</td>
              <td>Data de pagamento</td>
            </tr>
          </thead>
          <tbody>
            {debits.map(debit => (
              <Debit
                paid={debit.paid}
                key={debit.id}
                onClick={() => !debit.paid && setSelectedDebit(debit)}
              >
                <td>{debit.value}</td>
                <td>{debit.description}</td>
                <td>{debit.initial_date}</td>
                <td>{debit.final_date}</td>
                <td>{debit.payday ? debit.payday : '-'}</td>
              </Debit>
            ))}
          </tbody>
        </Table>

        {!!selectedDebit.id && (
          <Popup
            title={`Débito: R$ ${selectedDebit.value}`}
            handleClosePopup={() => setSelectedDebit({} as IDebit)}
          >
            {!payment.id && (
              <Form ref={formRef} onSubmit={handlePayDebit}>
                <InputGroup>
                  <Select
                    name="method"
                    icon={FiDollarSign}
                    optionsArray={paymentMethods}
                  />
                </InputGroup>

                <Button type="submit">Pagar</Button>
              </Form>
            )}

            {payment.id && payment.receipt_url && (
              <Document name="Recibo" link={payment.receipt_url} />
            )}
          </Popup>
        )}
      </Main>
    </Container>
  );
};

export default Debits;
