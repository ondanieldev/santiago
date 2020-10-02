import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiDollarSign } from 'react-icons/fi';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Container, Main, InputGroup } from './styles';
import Title from '../../components/Title';
import Table from '../../components/Table';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import IDebit from '../../entities/IDebit';
import api from '../../services/api';
import paymentSchema from '../../schemas/paymentSchema';
import getValidationErrors from '../../utils/getValidationErrors';

interface IPayDebitFormData {
  method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';
}

toast.configure();

const Debits: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { contractId } = useParams();

  const [debitId, setDebitId] = useState('');
  const [debitValue, setDebitValue] = useState(0);
  const [debits, setDebits] = useState([] as IDebit[]);

  useEffect(() => {
    const getDebits = async () => {
      try {
        const response = await api.get(`/debits/${contractId}`);

        setDebits(response.data);
      } catch {}
    };

    getDebits();
  }, [contractId]);

  const handleSelectDebit = useCallback((id: string, value: number) => {
    setDebitId(id);
    setDebitValue(value);
  }, []);

  const handlePayDebit = useCallback(
    async (data: IPayDebitFormData) => {
      try {
        formRef.current?.setErrors({});

        await paymentSchema.validate(data, {
          abortEarly: false,
        });

        await api.post('/payments', {
          debit_id: debitId,
          method: data.method,
        });

        toast.success('Débito pago com sucesso!');
      } catch (err) {
        if (err instanceof YupValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast.error('Erro ao realizar pagamento!');
      }
    },
    [debitId],
  );

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Pagar débitos" subtitle={`Contrato #${contractId}`} />

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
            </tr>
          </thead>
          <tbody>
            {debits.map(debit => (
              <tr
                key={debit.id}
                onClick={() => handleSelectDebit(debit.id, debit.value)}
              >
                <td>{debit.value}</td>
                <td>{debit.description}</td>
                <td>{debit.initial_date}</td>
                <td>{debit.final_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>

      {!!debitId && (
        <Popup
          title={`Débito: ${debitValue}`}
          handleClosePopup={() => setDebitId('')}
        >
          <Form ref={formRef} onSubmit={handlePayDebit}>
            <InputGroup>
              <Select name="method" icon={FiDollarSign} defaultValue="null">
                <option value="null">Selecionar método de pagamento</option>
                <option value="creditCard">Cartão de crédito</option>
                <option value="debitCard">Cartão de débito</option>
                <option value="cash">Dinheiro</option>
                <option value="check">Chque</option>
                <option value="deposit">Depósito</option>
                <option value="slip">Boleto</option>
              </Select>
            </InputGroup>

            <Button type="submit">Pagar</Button>
          </Form>
        </Popup>
      )}
    </Container>
  );
};

export default Debits;
