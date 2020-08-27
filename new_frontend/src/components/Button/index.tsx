import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
}

const Input: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Input;
