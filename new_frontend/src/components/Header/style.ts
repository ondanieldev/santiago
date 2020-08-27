import styled from 'styled-components';

export const Container = styled.header`
  grid-area: header;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
  background: var(--blue);
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
