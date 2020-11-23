import styled, { css, keyframes } from 'styled-components';

interface IIconsContainerProps {
  show: boolean;
}

const appearFromTop = keyframes`
  from {
    top: 0;
    opacity: 0;
  }

  to: {
    top: var(--header-height);
    opacity: 1;
  }
`;

export const Container = styled.header`
  grid-area: header;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
  background: var(--blue);

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
  }
`;

export const IconsContainer = styled.div<IIconsContainerProps>`
  display: flex;
  align-items: center;

  svg {
    display: none;
    visibility: hidden;
    margin-right: 12px;
    cursor: pointer;
    transition: transform 0.5s;

    ${props =>
      props.show &&
      css`
        transform: rotate(90deg);
      `}

    @media (max-width: 900px) {
      display: block;
      visibility: visible;
    }
  }
`;

export const Logo = styled.img`
  height: 60px;
  width: auto;
`;

export const UserContainer = styled.div`
  position: relative;
`;

export const UserInfo = styled.div`
  display: flex;
  cursor: pointer;

  div {
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  p {
    color: var(--white);
  }

  span {
    color: var(--gray);
  }

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const UserDropDown = styled.div`
  position: absolute;
  top: var(--header-height);
  width: 100%;
  background-color: #013c64;
  border-radius: 4px;
  overflow: hidden;
  padding: 12px;
  animation: ${appearFromTop} 0.5s;

  button {
    width: 100%;
    background-color: transparent;
    color: #f7f6fc;
    text-align: left;
    border: 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #f7f6fc;
  }
`;
