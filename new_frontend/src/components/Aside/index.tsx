import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { Container } from './styles';

interface ILink {
  path: string;
  label: string;
  permiss?:
    | 'new_enrollment_permiss'
    | 'validate_enrollment_permiss'
    | 'pay_debit_permiss'
    | 'discharge_payment_permiss';
}

const Aside: React.FC = () => {
  const { user, signOut } = useAuth();

  const [links, setLinks] = useState([] as ILink[]);

  useEffect(() => {
    const allLinks = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/new-enrollment', label: 'Nova matrícula' },
      {
        path: '/validate-enrollments',
        label: 'Validar matrículas',
        permiss: 'validate_enrollment_permiss',
      },
      {
        path: '/pay-debits',
        label: 'Pagar débitos',
        permiss: 'pay_debit_permiss',
      },
      {
        path: '/receive-payments',
        label: 'Receber pagamentos',
        permiss: 'discharge_payment_permiss',
      },
      {
        path: '/profiles',
        label: 'Gerenciar perfis',
        permiss: 'crud_profiles_permiss',
      },
      {
        path: '/grades',
        label: 'Gerenciar turmas',
        permiss: 'crud_grades_permiss',
      },
      {
        path: '/users',
        label: 'Gerenciar usuários',
        permiss: 'crud_users_permiss',
      },
    ] as ILink[];

    const filteredLinks = allLinks.filter(link => {
      if (link.permiss) {
        return user.profile[link.permiss];
      }

      return true;
    });

    setLinks(filteredLinks);
  }, [user]);

  return (
    <Container>
      <ul>
        {links.map(link => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
        <li>
          <button type="button" onClick={signOut}>
            Logout
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Aside;
