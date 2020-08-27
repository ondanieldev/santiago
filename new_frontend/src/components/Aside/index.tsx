import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Aside: React.FC = () => {
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/debits', label: 'Pagar débito' },
    { path: '/enrollment-responsibles', label: 'Nova matrícula' },
    { path: '/profiles', label: 'Gerenciar perfis' },
    { path: '/grades', label: 'Gerenciar turmas' },
    { path: '/users', label: 'Gerenciar usuários' },
    { path: '/enrollments', label: 'Validar matrículas' },
    { path: '/payments', label: 'Receber pagamento' },
  ];

  return (
    <Container>
      <ul>
        {links.map(link => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Aside;
