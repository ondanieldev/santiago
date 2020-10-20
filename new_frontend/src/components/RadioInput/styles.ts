import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  padding: 12px 32px 12px 0;
  border: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--black);
`;

export const RadioGroup = styled.div`
  display: flex;
  margin-top: 6px;

  div {
    & + div {
      margin-left: 18px;
    }

    input {
      margin: 0 6px 0 0;
    }

    label {
      cursor: pointer;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background-color: var(--red);
    color: var(--white);
    font-weight: regular;

    &::before {
      border-color: var(--red) transparent;
    }
  }
`;
