import styled, { keyframes } from 'styled-components';

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--black);
  opacity: .8;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #00008b;
  width: 120px;
  height: 120px;
  -webkit-animation: ${rotate} 2s linear infinite; 
  animation: ${rotate} 2s linear infinite;
`;