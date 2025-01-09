import styled from "styled-components";

interface IButtonProps {
  margintop?: number;
  marginbottom?: number;
}

export const PrimaryButton = styled.button<IButtonProps>`
  background-color: #88ab8e;
  height: 35px;
  width: 350px;
  margin-top: ${(props) => props.margintop}px;
  margin-bottom: ${(props) => props.marginbottom}px;
  font-family: "Raleway", serif;
  border: 1px solid transparent;

  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    background-color: #afc8ad;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  margin-top: ${(props) => props.margintop}px;
  background-color: #f2f1eb;
  border: 1px solid #88ab8e;
  font-family: "Raleway", serif;

  &:hover {
    background-color: #dbe3db;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

export const GenerateButton = styled.button`
  height: 90px;
  width: 300px;
  border-radius: 30%;
  background-color: #88ab8e;
  font-family: "Raleway", serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  i {
    margin-left: 10px;
  }
`;
