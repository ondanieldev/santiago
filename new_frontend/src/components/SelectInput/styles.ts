import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px;
  border-radius: 5px;
  border: 0;
  background: var(--white);
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid var(--black);
  color: var(--black);
  transition: all 0.2s;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red);
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  select {
    cursor: pointer;
    font-size: 16px;
    color: var(--black);
    background: transparent;
    border: 0;
    flex: 1;
    align-items: center;
    padding-right: 16px;
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
