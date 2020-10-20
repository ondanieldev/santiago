import React from 'react';

import { Container, UserInfo, Logo } from './style';
import logoImage from '../../assets/images/logo.png';

const Header: React.FC = () => (
  <Container>
    <Logo src={logoImage} alt="logo" />

    <UserInfo>
      <div>
        <p>Daniel Oliveira</p>
        <span>Direção</span>
      </div>

      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsuccesscreeations.com%2Fwp-content%2Fuploads%2F2009%2F04%2Fgravatar.jpg&f=1&nofb=1"
        alt="logo"
      />
    </UserInfo>
  </Container>
);

export default Header;
