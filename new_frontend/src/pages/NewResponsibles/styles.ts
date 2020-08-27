import styled from 'styled-components';

import { BaseGridTemplate, BaseGridMain } from '../../styles/grid';

export const Container = styled(BaseGridTemplate)``;

export const Main = styled(BaseGridMain)`
  form {
    > button {
      margin-top: 24px;

      & + button {
        margin-left: 12px;
      }
    }
  }
`;

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

export const ResponsiblesList = styled.ul`
  margin-top: 24px;
  padding-left: 0;
  list-style: none;
  border-radius: 5px;
  border: 2px solid var(--black);
  overflow: hidden;

  li {
    display: flex;
    align-items: center;
    padding: 16px;

    & + li {
      border-top: 2px solid var(--black);
    }

    svg {
      cursor: pointer;
      margin-right: 12px;
      transition: color 0.1s linear;

      &:hover {
        color: var(--green);
      }

      & + svg {
        &:hover {
          color: var(--red);
        }
      }
    }
  }
`;

export const NavigationButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;
