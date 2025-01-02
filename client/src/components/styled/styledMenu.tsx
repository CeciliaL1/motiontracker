import { css, styled } from "styled-components";

interface IMenyProps {
  open?: boolean;
  background?: string;
  size?: string;
}

export const NavMenu = styled.nav<IMenyProps>`
  margin-top: 22px;

  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-left: 100px;
  }
  li {
    margin: 10px;
    margin-left: 20px;
    font-size: 1.2rem;
    font-family: "Raleway", serif;
  }
  a {
    text-decoration: none;
    color: black;
    letter-spacing: 1px;
    font-weight: 700;
  }
  li i {
    padding: 7px;
    border-radius: 50%;
    background-color: #${(props) => props.background};
    font-size: ${(props) => props.size}rem;
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
            text-align: center;
            z-index: 0;
          }
          li:nth-child(1) {
            margin-top: 150px;
          }
          li {
            margin-top: 50px;
            font-size: 1.2rem;
          }
          a {
            letter-spacing: 3px;
            font-weight: 700;
            text-transform: uppercase;
            color: black;
          }
        `
      : ""}
`;

export const NavMenuLoggedIn = styled.nav<IMenyProps>`
  margin-top: 22px;

  ul {
    display: flex;
    flex-direction: row;

    list-style: none;
  }
  li {
    margin: 5px;
    margin-left: 20px;
    font-size: 1.2rem;
    font-family: "Raleway", serif;
  }
  a {
    text-decoration: none;
    color: black;
    letter-spacing: 1px;
    font-weight: 700;
  }
  li i {
    padding: 7px;
    border-radius: 50%;
    background-color: #${(props) => props.background};
    font-size: ${(props) => props.size}rem;
  }
`;

export const HamburgerMenu = styled.div<IMenyProps>`
  display: none;
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
