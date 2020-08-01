import styled from 'styled-components';

export const VideoCardContainer = styled.a`
  border: 2px solid;
  border-radius: 4px;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 300px;
  height: 197px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;

  transition: all 0.5s;

  &:hover, &:focus{
    transform: scale(1.2);
    margin-left: 25px;
    margin-right: 25px;
    opacity: .8;
  }
  
  &:hover :nth-child(1),
  &:focus :nth-child(1){
    opacity: 1;
    transform: translateY(0);
  }
  
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

export const Description = styled.span`
    background: rgba(0, 0, 0, 0.95);
    margin-bottom: 2%;
    padding: 10px;
    font-size: 13px;
    font-weight: bold;
    transform: translateY(80%);
		transition: .2s;
		opacity: 0;
`;