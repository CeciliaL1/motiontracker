import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  text-align: center;
`;

export const Name = styled.input.attrs({
  type: "text",
  placeholder: "Name...",
})`
  font-family: "roboto";
  background-color: #f2f1eb;
  width: 350px;
  height: 40px;
  padding: 10px;
  border: none;
  outline: none;
  margin: 10px;

  &:hover {
    background-color: #eee7da;
  }
`;

export const Password = styled(Name).attrs({
  type: "password",
  placeholder: "Password...",
})``;
