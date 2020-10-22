import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px 48px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      max-width: 350px;
      margin-bottom: 12px;
    }

    span {
      margin-bottom: 12px;
    }

    button {
      width: 100%;
      max-width: 350px;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  strong {
    margin-bottom: 12px;
  }
`;

export const DataGroup = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;

  button {
    & + button {
      margin-left: 12px;
    }
  }
`;
