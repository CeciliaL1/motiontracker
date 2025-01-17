import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  gap: 100px;

  flex-direction: row;
  justify-content: space-around;
  background-color: #88ab8e;

  img {
    height: 85px;
    width: 85px;
  }

  @media screen and (max-width: 801px) {
    gap: 5px;
  }
`;

export const StyledFooter = styled.footer`
  width: 100%;
  height: 300px;
  position: relative;
  bottom: 0;
  z-index: -1;

  background-color: #88ab8e;
  font-family: "Raleway", serif;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    margin-top: 100px;
  }

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

  div {
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: black;
    cursor: pointer;
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
  min-height: 70vh;
  max-width: 1100px;
  margin: auto;
  margin-top: 100px;
`;
