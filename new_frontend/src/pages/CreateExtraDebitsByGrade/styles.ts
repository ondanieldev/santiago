import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    display: flex;
    flex-direction: column;

    button {
      align-self: flex-end;
      margin-top: 12px;
    }
  }
`;

export const ContractsList = styled.div`
  margin-top: 12px;
`;

export const Contract = styled.div`
  padding: 0 12px;
  border-radius: 4px;
  border: 2px solid #212529;

  & + div {
    margin-top: 12px;
  }
`;

export const FormGroup = styled.div``;

export const InputGroup = styled.div`
  display: flex;
  align-items: flex-end;

  > div {
    & + div {
      margin-left: 12px;
    }
  }

  & + div {
    margin-top: 12px;
  }
`;
