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

  &:hover {
    background-color: #dbe3db;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;
