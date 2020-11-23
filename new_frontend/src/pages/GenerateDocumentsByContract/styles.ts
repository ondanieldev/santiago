import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const DocumentGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;

  a {
    & + a {
      margin-left: 12px;
    }
  }
`;
