import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    text-align: center;
    width: 160px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    background-color: var(--blue);
    color: var(--white);

    font-size: 14px;
    font-weight: bold;
    padding: 8px;
    border-radius: 4px;

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    &::before {
      content: '';

      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-style: solid;
      border-color: var(--blue) transparent;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
