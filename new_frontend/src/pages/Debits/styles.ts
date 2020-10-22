import styled, { css } from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)``;

export const InputGroup = styled.div`
  margin-bottom: 12px;
`;

interface IDebitProps {
  paid: boolean;
}

export const Debit = styled.tr<IDebitProps>`
  ${props =>
    props.paid &&
    css`
      color: #4caf50;
      cursor: text;
    `}
`;
