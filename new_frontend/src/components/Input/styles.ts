import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isReadOnly: boolean;
  search: boolean;
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
    props.search &&
    css`
      border-radius: 0 5px 5px 0;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red);
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--blue);
      color: var(--blue);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--green);
    `}

  ${props =>
    props.isReadOnly &&
    css`
      border-color: var(--black);
      color: var(--black);
      background-color: var(--gray);
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    color: var(--black);
    background: transparent;
    border: 0;
    flex: 1;
    padding-right: 16px;

    &::placeholder {
      color: var(--gray);
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
