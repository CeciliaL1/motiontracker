import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #88ab8e;

  img {
    height: 85px;
    width: 85px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  height: 30%;
  position: fixed;
  bottom: 0;
  background-color: #88ab8e;
  font-family: "Raleway", serif;
  display: flex;
  flex-direction: column;

  img {
    height: 85px;
    width: 85px;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  section:nth-of-type(3) {
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
  }
  h2 {
    margin-left: -12px;
  }
  div {
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: underline;
  }
  i {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const Main = styled.main`
  font-family: "Raleway", serif;
  min-height: 100vh;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`;
