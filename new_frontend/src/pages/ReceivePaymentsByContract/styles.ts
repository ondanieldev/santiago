import styled, { css } from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)``;

export const InputGroup = styled.div`
  margin-bottom: 12px;
`;

export const WarnMessage = styled.p`
  max-width: 400px;
  margin-bottom: 12px;

  strong {
    color: var(--red);
  }
`;

interface IPaymentProps {
  discharged: boolean;
}

export const Payment = styled.tr<IPaymentProps>`
  ${props =>
    props.discharged &&
    css`
      color: #4caf50;
    `}
`;
