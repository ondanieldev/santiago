import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)``;

export const ToggleView = styled.div`
  margin-bottom: 24px;
`;

export const ToggleViewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  button {
    margin-right: 12px;
    max-height: 50px;
  }
`;

export const ToggleViewForm = styled.div``;

export const InputGroup = styled.div`
  display: flex;

  & + div {
    margin-top: 12px;
  }

  div {
    margin-top: 0;

    & + div {
      margin-left: 12px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
