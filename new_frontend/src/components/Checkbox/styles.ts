import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  padding: 12px 32px 12px 0;
  border: 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--black);
  border: 2px solid transparent;

  input {
    color: var(--black);
    background: transparent;
    border: 0;
    margin-right: 12px;
    height: 18px;
    width: 18px;
  }

  label {
    cursor: pointer;
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

    &::before {
      border-color: var(--red) transparent;
    }
  }
`;
