import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
import { ReactComponent as Loading } from '../../assets/images/loading.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
}

const Input: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container disabled={loading} {...rest}>
    {loading ? <Loading /> : children}
  </Container>
);

export default Input;
