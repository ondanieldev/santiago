import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, AnimatedContainer, Mask } from './styles';
import { useAuth } from '../../hooks/auth';
import { useAside } from '../../hooks/aside';

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
  const { show, toggle } = useAside();

  const history = useHistory();

  const [links, setLinks] = useState([] as ILink[]);

  useEffect(() => {
    if (show && window.innerWidth <= 900) {
      toggle();
    }
  }, [history]); // eslint-disable-line

  useEffect(() => {
    const allLinks = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/new-enrollment', label: 'Nova matrícula' },
      {
        path: '/validate-enrollments/grades',
        label: 'Validar matrículas',
      },
      {
        path: '/create-extra-debits/grades',
        label: 'Criar débitos adicionais',
      },
      {
        path: '/pay-debits/grades',
        label: 'Pagar débitos',
      },
      {
        path: '/receive-payments/grades',
        label: 'Receber pagamentos',
      },
      {
        path: '/extra-debits/grades',
        label: 'Gerenciar débitos adicionais',
      },
      {
        path: '/profiles',
        label: 'Gerenciar perfis',
      },
      {
        path: '/grades',
        label: 'Gerenciar turmas',
      },
      {
        path: '/users',
        label: 'Gerenciar usuários',
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
      {show && (
        <AnimatedContainer>
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
        </AnimatedContainer>
      )}
      {show && window.innerWidth <= 900 && <Mask />}
    </Container>
  );
};

export default Aside;
