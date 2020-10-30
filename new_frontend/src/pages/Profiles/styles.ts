import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;

    ul {
      margin-top: 24px;
      margin-left: 0px;
      width: 100%;
      max-width: 1000px;
    }
  }
`;

export const ButtonGroup = styled.div`
  button {
    & + button {
      margin-left: 12px;
    }
  }
`;
