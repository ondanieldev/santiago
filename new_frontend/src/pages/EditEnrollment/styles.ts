import styled, { css } from 'styled-components';

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

interface InputGroupProps {
  displayColumn?: boolean;
}

export const InputGroup = styled.div<InputGroupProps>`
  display: flex;

  & + div {
    margin-top: 12px;
  }

  > div {
    & + div {
      margin-left: 12px;
    }
  }

  ${props =>
    props.displayColumn &&
    css`
      flex-direction: column;

      > div {
        & + div {
          margin-left: 0;
          margin-top: 12px;
        }
      }
    `}
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
