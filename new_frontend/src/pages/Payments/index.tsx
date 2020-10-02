import React, { useEffect, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Container, Main, InputGroup, WarnMessage } from './styles';
import Table from '../../components/Table';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import IPayment from '../../entities/IPayment';
import api from '../../services/api';

toast.configure();

const Payments: React.FC = () => {
  const [payments, setPayments] = useState([] as IPayment[]);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    api.get('payments').then(response => setPayments(response.data));
  }, []);

  const formatMethod = useCallback(
    (
      method:
        | 'creditCard'
        | 'debitCard'
        | 'cash'
        | 'check'
        | 'deposit'
        | 'slip',
    ) => {
      switch (method) {
        case 'creditCard':
          return 'Cartão de crédito';
        case 'debitCard':
          return 'Cartão de débito';
        case 'cash':
          return 'Dinheiro';
        case 'check':
          return 'Cheque';
        case 'deposit':
          return 'Depósito';
        case 'slip':
          return 'Boleto';
        default:
          return '-';
      }
    },
    [],
  );

  const handleDischargePayment = useCallback(() => {
    api
      .post('/discharges', {
        payment_id: paymentId,
      })
      .then(() => {
        toast.success('Pagamento recebido com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao receber pagamento!');
      })
      .finally(() => {
        setPaymentId('');
        setConfirmMessage('');
      });
  }, [paymentId]);

  return (
    <Container>
      <Header />

      <Aside />

      <Main>
        <Title title="Gerenciar pagamentos" />

        <Table
          isVoid={payments.length <= 0}
          voidMessage="Não há pagamentos para serem recebidos!"
        >
          <thead>
            <tr>
              <td>Operador</td>
              <td>Valor</td>
              <td>Método utilizado</td>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} onClick={() => setPaymentId(payment.id)}>
                <td>{payment.user.username}</td>
                <td>{payment.amount}</td>
                <td>{formatMethod(payment.method)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>

      {!!paymentId && (
        <Popup title="Receber" handleClosePopup={() => setPaymentId('')}>
          <Form onSubmit={handleDischargePayment}>
            <WarnMessage>
              <strong> ATENÇÃO: </strong>
              esta ação não pode ser desfeita! Digite
              <b> CONFIRMAR </b>
              para receber o pagamento.
            </WarnMessage>

            <InputGroup>
              <Input
                name="confirm_message"
                icon={FiCheck}
                value={confirmMessage}
                onChange={e => setConfirmMessage(e.target.value)}
              />
            </InputGroup>

            <Button disabled={confirmMessage !== 'CONFIRMAR'} type="submit">
              Receber
            </Button>
          </Form>
        </Popup>
      )}
    </Container>
  );
};

export default Payments;
