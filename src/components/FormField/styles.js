import styled from 'styled-components';

export const Container = styled.con

export const Span = styled.span`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 12px;
  margin-top: 20px;
  font-size: 20px;
  transition: all .3s;
`;

export const Label = styled.label`
  color: var(--white);
  position: relative;
  display: block;
`;

export const Input = styled.input`
  background: rgb(83, 88, 93);
  color: var(--white);
  width: 100%;
  height: 20px;
  font-size: 20px;
  margin-bottom: 20px;
  outline: none; 
  border: 4px solid transparent;
  padding: 38px 10px 20px;
  border-radius: 4px;
  transition: 0.2s ease all;
  
  &:focus + ${Span},
  &:not(:placeholder-shown) + ${Span} {
    font-size: 12px;
    margin-top: 12px;
  }   
`;

export const TextArea = styled.textarea`
  background: rgb(83, 88, 93);
  color: var(--white);
  width: 100%;
  height: 130px;
  font-size: 20px;
  margin-bottom: 20px;
  outline: none; 
  border: 4px solid transparent;
  padding: 26px 10px 20px;
  border-radius: 4px;
  transition: 0.2s ease all;
  
  &:focus + ${Span},
  &:not(:placeholder-shown) + ${Span}{
    font-size: 12px;
    margin-top: 12px;
  } 
`;

export const CorSelection = styled.input`
  background: rgb(83, 88, 93);
  color: var(--white);
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
  outline: none; 
  border: 4px solid transparent;
  border-radius: 4px;
  padding: 5px 10px 10px 50px;
`;