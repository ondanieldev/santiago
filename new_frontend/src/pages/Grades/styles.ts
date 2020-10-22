import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    > div {
      & + div {
        margin-top: 12px;
      }
    }
  }

  ul {
    margin-top: 0;
    margin-left: 24px;
    flex: 1;
    max-width: 300px;
    max-height: 400px;
    overflow-y: scroll;
  }
`;

export const DoubleColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ButtonGroup = styled.div`
  button {
    & + button {
      margin-left: 12px;
    }
  }
`;
