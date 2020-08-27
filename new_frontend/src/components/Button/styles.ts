import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  padding: 0 16px;
  border-radius: 5px;
  border: 0;
  height: 56px;
  font-weight: 500;
  transition: background-color 0.2s;

  color: var(--white);
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}

  background-color: #013c64;
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}

  &:hover {
    background-color: ${shade(0.2, '#013C64')};

    ${props =>
      props.backgroundColor &&
      css`
        background-color: ${shade(0.2, props.backgroundColor)};
      `};
  }
`;
