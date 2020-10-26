import React, { useState } from 'react';

import { Container, UserInfo, Logo } from './style';
import logoImage from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';

interface IUserData {
  username: string;
  role: string;
}

const Header: React.FC = () => {
  const { user } = useAuth();

  const [userData] = useState<IUserData>(() => {
    if (!user) {
      return {} as IUserData;
    }

    return {
      username: user.username,
      role: user.profile.name,
    };
  });

  return (
    <Container>
      <Logo src={logoImage} alt="logo" />

      <UserInfo>
        <div>
          <p>{userData.username}</p>
          <span>{userData.role}</span>
        </div>

        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsuccesscreeations.com%2Fwp-content%2Fuploads%2F2009%2F04%2Fgravatar.jpg&f=1&nofb=1"
          alt="logo"
        />
      </UserInfo>
    </Container>
  );
};

export default Header;
