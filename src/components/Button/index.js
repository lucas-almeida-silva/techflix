import styled, { css } from "styled-components"

const Button = styled.button`
    color: var(--white);
    background: ${({background}) => background || "var(--black)"};
    border: 1px solid var(--white);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    justify-content: center;
    margin-right: 5px;
    transition: opacity .3s;
    text-align: center;
    min-width: 10%;

    &:hover,
    &focus {
        opacity: .5;
    }

  ${({ float }) => {
    return float && css `
      float: ${float}
    }
    `;
  }}

`;

export default Button;