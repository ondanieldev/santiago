import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export const Button = styled.button<IButtonProps>`
  border: 0;
  padding: 0 6px;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  transition: border-color 0.2s;

  ${props =>
    props.isActive &&
    css`
      border-color: var(--blue);
      color: vaR(--blue);
    `}

  & + button {
    margin-left: 12px;
  }

  &:hover {
    border-color: var(--blue);
  }
`;
