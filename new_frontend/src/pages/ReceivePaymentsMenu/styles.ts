import styled from 'styled-components';

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
