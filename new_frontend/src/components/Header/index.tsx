import React, { useState, useCallback } from 'react';
import { FiMenu } from 'react-icons/fi';

import {
  Container,
  UserInfo,
  Logo,
  UserContainer,
  IconsContainer,
  UserDropDown,
} from './style';
import logoImage from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';
import { useAside } from '../../hooks/aside';

interface IUserData {
  username: string;
  role: string;
}

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { show, toggle } = useAside();
  const [showDropDown, setShowDropDown] = useState(false);

  const [userData] = useState<IUserData>(() => {
    if (!user) {
      return {} as IUserData;
    }

    return {
      username: user.username,
      role: user.profile.name,
    };
  });

  const toggleDropDown = useCallback(() => {
    setShowDropDown(!showDropDown);
  }, [showDropDown]);

  return (
    <Container>
      <IconsContainer show={show}>
        <FiMenu size={40} color="#F7F6FC" onClick={toggle} />

        <Logo src={logoImage} alt="logo" />
      </IconsContainer>

      <UserContainer>
        <UserInfo onClick={toggleDropDown}>
          <div>
            <p>{userData.username}</p>
            <span>{userData.role}</span>
          </div>

          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsuccesscreeations.com%2Fwp-content%2Fuploads%2F2009%2F04%2Fgravatar.jpg&f=1&nofb=1"
            alt="logo"
          />
        </UserInfo>

        {showDropDown && (
          <UserDropDown>
            <button onClick={signOut} type="button">
              Logout
            </button>
          </UserDropDown>
        )}
      </UserContainer>
    </Container>
  );
};

export default Header;
