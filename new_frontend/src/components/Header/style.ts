import styled, { css } from 'styled-components';

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

interface IIconsContainerProps {
  show: boolean;
}

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

export const UserInfo = styled.div`
  display: flex;

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
