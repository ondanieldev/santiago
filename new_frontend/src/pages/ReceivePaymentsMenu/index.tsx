import React, { useEffect, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Main, InputGroup, WarnMessage } from './styles';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import Document from '../../components/Document';
import IPayment from '../../entities/IPayment';
import IDischarge from '../../entities/IDischarge';
import api from '../../services/api';
import { formatPaymentMethod } from '../../utils/formatFunctions';

const Payments: React.FC = () => {
  const [payments, setPayments] = useState([] as IPayment[]);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [discharge, setDischarge] = useState({} as IDischarge);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get('payments')
      .then(response => setPayments(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carragar pagamentos! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const handleDischargePayment = useCallback(() => {
    if (loadingSubmit) {
      return;
    }

    setLoadingSubmit(true);

    api
      .post('/discharges', {
        payment_id: paymentId,
      })
      .then(response => {
        const dischargeData = response.data as IDischarge;

        const paymentsWithoutDischarged = payments.filter(
          payment => payment.id !== paymentId,
        );

        setDischarge(dischargeData);

        setPayments(paymentsWithoutDischarged);

        toast.success('Pagamento recebido com sucesso!');
      })
      .catch(err => {
        if (err.response) {
          toast.error(
            `Erro ao receber pagamento: ${err.response.data.message}`,
          );
        } else {
          toast.error(
            'Erro interno do servidor! Por favor, tente novamente mais tarde.',
          );
        }
      })
      .finally(() => {
        setConfirmMessage('');
        setLoadingSubmit(false);
      });
  }, [paymentId, payments, loadingSubmit]);

  const handleClosePopup = useCallback(() => {
    setPaymentId('');
    setDischarge({} as IDischarge);
  }, []);

  return (
    <Container>
      <Loading show={loadingPage} />

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
                <td>{formatPaymentMethod(payment.method)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>

      {!!paymentId && (
        <Popup title="Receber" handleClosePopup={handleClosePopup}>
          {!discharge.id && (
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

              <Button
                disabled={confirmMessage !== 'CONFIRMAR'}
                type="submit"
                loading={loadingSubmit}
              >
                Receber
              </Button>
            </Form>
          )}

          {discharge.id && (
            <Document name="Recibo" link={discharge.receipt_url} />
          )}
        </Popup>
      )}
    </Container>
  );
};

export default Payments;
