import { css, styled } from "styled-components";

interface IMenyProps {
  open: boolean;
}

export const NavMenu = styled.nav<IMenyProps>`
  margin-top: 22px;

  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
  }
  li {
    margin: 10px;
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
    color: black;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 801px) {
    ul {
      display: none;
    }
  }

  ${({ open }) =>
    open
      ? css<IMenyProps>`
          ul {
            display: flex;
            flex-direction: column;
            text-align: left;
            background-color: #88ab8e;
            position: fixed;
            top: 0;
            right: 0px;
            height: 100vh;
            width: 100vw;
            padding: 0;
            color: black;
          }
          li:nth-child(1) {
            margin-top: 100px;
          }
          li {
            margin-top: 30px;
            font-size: 1.2rem;
          }
          a {
            color: black;
          }
        `
      : ""}
`;
export const HamburgerMenu = styled.div<IMenyProps>`
  @media screen and (max-width: 800px) {
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 30px;
    right: 40px;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;

    div {
      width: 2rem;
      height: 0.3rem;
      cursor: pointer;

      ${({ open }) =>
        open
          ? css<IMenyProps>`
              border: 0.3px solid black;
              background-color: black;
            `
          : css<IMenyProps>`
              border: 0.3px solid black;
              background-color: black;
            `};
      border-radius: 10px;
    }
  }
`;
