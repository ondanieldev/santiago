import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  & + div {
    margin-top: 24px;
  }
`;

export const InputGroup = styled.div`
  display: flex;

  & + div {
    margin-top: 12px;
  }

  > div {
    & + div {
      margin-left: 12px;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;

    > div {
      & + div {
        margin-left: 0;
        margin-top: 12px;
      }
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 6px;
    }
  }
`;
