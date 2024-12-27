import styled from "styled-components";

interface IHeadingProps {
  margintop?: number;
  marginbottom?: number;
  marginleft?: number;
}

export const Heading1 = styled.h1<IHeadingProps>`
  margin-top: ${(props) => props.margintop}px;
  margin-bottom: ${(props) => props.marginbottom}px;
  margin-left: ${(props) => props.marginleft}px;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
export const Heading2 = styled.h2<IHeadingProps>`
  margin-bottom: ${(props) => props.marginbottom}px;
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

export const NotFoundDescription = styled.p`
  font-family: "Roboto", serif;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;
