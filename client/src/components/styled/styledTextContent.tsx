import styled from "styled-components";

export const Heading1 = styled.h1`
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 40px;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
export const LongText = styled.div`
  margin-top: 40px;
  max-width: 600px;
  font-family: "Roboto", serif;
  font-weight: 400;
  font-style: normal;
  @media screen and (max-width: 800px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LinkWrap = styled.div`
  a {
    text-decoration: none;
    color: black;
    margin-left: 250px;
    margin-right: 10px;
    font-size: 1rem;
  }
  i {
    font-size: 1%.5;
  }
`;
