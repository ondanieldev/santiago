import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, AnimatedContainer, Mask } from './styles';
import { useAuth } from '../../hooks/auth';
import { useAside } from '../../hooks/aside';
import IPermissions from '../../dtos/IPermissions';

interface ILink {
  path: string;
  label: string;
  permiss?: Extract<keyof IPermissions, keyof IPermissions>[];
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
      {
        path: '/new-enrollment',
        label: 'Nova matrícula',
        permiss: ['create_new_enrollments_permiss'],
      },
      {
        path: '/validate-enrollments/grades',
        label: 'Validar matrículas',
        permiss: ['validate_enrollments_permiss'],
      },
      {
        path: '/create-extra-debits/grades',
        label: 'Criar débitos adicionais',
        permiss: ['create_extra_debits_permiss'],
      },
      {
        path: '/pay-debits/grades',
        label: 'Pagar débitos',
        permiss: ['pay_debits_permiss'],
      },
      {
        path: '/receive-payments/grades',
        label: 'Receber pagamentos',
        permiss: ['discharge_payments_permiss'],
      },
      {
        path: '/generate-documents/grades',
        label: 'Gerar documentos',
        permiss: ['generate_documents_permiss'],
      },
      {
        path: '/extra-debits/grades',
        label: 'Gerenciar débitos adicionais',
        permiss: ['crud_extra_debits_permiss'],
      },
      {
        path: '/profiles',
        label: 'Gerenciar perfis',
        permiss: ['crud_profiles_permiss'],
      },
      {
        path: '/grades',
        label: 'Gerenciar turmas',
        permiss: ['crud_grades_permiss'],
      },
      {
        path: '/users',
        label: 'Gerenciar usuários',
        permiss: ['crud_users_permiss'],
      },
    ] as ILink[];

    const filteredLinks = allLinks.filter(link => {
      let hasPermiss = false;

      if (link.permiss) {
        link.permiss.forEach(permiss => {
          if (permiss && user.profile[permiss]) {
            hasPermiss = true;
          }
        });
      } else {
        hasPermiss = true;
      }

      return hasPermiss;
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
