import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import { Container, Main, DocumentGroup } from './styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Document from '../../components/Document';
import api from '../../services/api';
import IContract from '../../entities/IContract';

interface IParams {
  contract_id: string;
}

const GenerateDocumentsByContract: React.FC = () => {
  const { contract_id } = useParams<IParams>();

  const formRef = useRef<FormHandles>(null);

  const [contract, setContract] = useState({} as IContract);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleGenerateDocuments = useCallback(async () => {
    try {
      setLoadingSubmit(true);

      const response = await api.post<IContract>(
        `/contracts/${contract_id}/documents`,
      );

      const contractWithDocuments = response.data;

      setContract(contractWithDocuments);
    } catch (err) {
      if (err.response) {
        toast.error(`Erro ao gerar documentos: ${err.response.data.message}`);
      } else {
        toast.error(
          'Erro interno do servidor! Por favor, tente novamente mais tarde.',
        );
      }
    } finally {
      setLoadingSubmit(false);
    }
  }, [contract_id]);

  useEffect(() => {
    setLoadingPage(true);
    api
      .get(`contracts/${contract_id}`)
      .then(response => setContract(response.data))
      .catch(() => {
        toast.error(
          'Erro ao carragar contrato! Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [contract_id]);

  return (
    <Container>
      <Loading show={loadingPage} />

      <Header />

      <Aside />

      <Main>
        <Title title="Gerar documentos" />

        <DocumentGroup>
          {contract.contract_document && (
            <Document link={contract.contract_document} name="Contrato" />
          )}

          {contract.enrollment_form_document && (
            <Document
              link={contract.enrollment_form_document}
              name="Ficha de matrícula"
            />
          )}

          {contract.checklist_document && (
            <Document link={contract.checklist_document} name="Checklist" />
          )}
        </DocumentGroup>

        <Form ref={formRef} onSubmit={handleGenerateDocuments}>
          <Button loading={loadingSubmit} type="submit">
            Gerar novos documentos
          </Button>
        </Form>
      </Main>
    </Container>
  );
};

export default GenerateDocumentsByContract;
