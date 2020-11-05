import styled, { css } from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    margin-bottom: 24px;
  }
`;

interface IDebitProps {
  paid: boolean;
}

export const Debit = styled.tr<IDebitProps>`
  cursor: default;
  ${props =>
    props.paid &&
    css`
      color: #4caf50;
    `}
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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    & + button {
      margin-left: 12px;
    }
  }
`;

export const ActionGroup = styled.div`
  svg {
    cursor: pointer;
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.05);
    }

    & + svg {
      margin-left: 8px;
    }
  }
`;

export const WarnMessage = styled.p`
  max-width: 400px;
  margin-bottom: 12px;

  strong {
    color: var(--red);
  }
`;
