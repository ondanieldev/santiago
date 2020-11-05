import styled from 'styled-components';

export const Container = styled.div``;

export const GradesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    padding: 18px 12px;
    border-radius: 4px;
    margin: 12px;
    border: 2px solid #013c64;
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
