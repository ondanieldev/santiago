import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Main, InputGroup, WarnMessage, Payment } from './styles';
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
import { formatPaymentMethod, formatCoin } from '../../utils/formatFunctions';

interface IParams {
  contract_id: string;
}

const Payments: React.FC = () => {
  const { contract_id } = useParams<IParams>();

  const [payments, setPayments] = useState([] as IPayment[]);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [payment, setPayment] = useState({} as IPayment);
  const [discharge, setDischarge] = useState({} as IDischarge);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get(`contracts/${contract_id}/payments`)
      .then(response => setPayments(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carragar pagamentos! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [contract_id]);

  const handleDischargePayment = useCallback(() => {
    if (loadingSubmit) {
      return;
    }

    setLoadingSubmit(true);

    api
      .post('/discharges', {
        payment_id: payment.id,
      })
      .then(response => {
        const dischargeData = response.data as IDischarge;

        const paymentsList = payments;

        paymentsList.forEach(p => {
          if (p.id === payment.id) {
            Object.assign(p, {
              discharged: true,
              discharge: dischargeData,
            });
          }
        });

        setDischarge(dischargeData);

        setPayments(paymentsList);

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
  }, [payment, payments, loadingSubmit]);

  const handleClosePopup = useCallback(() => {
    setPayment({} as IPayment);
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
              <td>Data de recebimento</td>
            </tr>
          </thead>
          <tbody>
            {payments.map(actualPayment => (
              <Payment
                discharged={actualPayment.discharged}
                key={actualPayment.id}
                onClick={() => setPayment(actualPayment)}
              >
                <td>{actualPayment.user.username}</td>
                <td>{formatCoin(actualPayment.amount)}</td>
                <td>{formatPaymentMethod(actualPayment.method)}</td>
                <td>
                  {actualPayment.discharged ? actualPayment.discharge_day : '-'}
                </td>
              </Payment>
            ))}
          </tbody>
        </Table>
      </Main>

      {!!payment.id && (
        <Popup title="Receber" handleClosePopup={handleClosePopup}>
          {!discharge.id && !payment.discharged && (
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

          {(discharge.id ||
            (payment.discharge && payment.discharge.receipt_url)) && (
            <Document
              name="Recibo"
              link={
                discharge.receipt_url || payment.discharge.receipt_url || ''
              }
            />
          )}
        </Popup>
      )}
    </Container>
  );
};

export default Payments;
