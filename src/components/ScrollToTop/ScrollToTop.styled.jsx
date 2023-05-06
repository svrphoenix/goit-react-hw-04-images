import styled from 'styled-components';
import { FaAngleUp } from 'react-icons/fa';

export const ButtonContainer = styled.div`
  position: relative;
`;

export const Icon = styled(FaAngleUp)`
  position: fixed;
  bottom: 40px;
  right: 25px;
  z-index: 20;
  background-color: #3f51b5;
  border: 2px solid #fff;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  color: #fff;
  cursor: pointer;
  animation: movebtn 3s ease-in-out infinite;
  transition: all 0.5s ease-in-out;
  &:hover {
    animation: none;
    background: #fff;
    color: #3f51b5;
    border: 2px solid #3f51b5;
  }
  @keyframes movebtn {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;
