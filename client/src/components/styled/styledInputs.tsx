import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  text-align: center;
  padding-bottom: 100px;
`;

export const Name = styled.input.attrs({
  type: "text",
  name: "userName",
  placeholder: "Username",
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

export const TextInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder || "Type text here",
  name: props.name,
  value: props.value,
  onChange: props.onChange,
}))`
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
  name: "password",
  placeholder: "Password",
})``;

export const Email = styled(Name).attrs({
  type: "text",
  name: "email",
  placeholder: "Email",
})``;

export const FirstName = styled(Name).attrs({
  type: "text",
  name: "firstName",
  placeholder: "First name",
})``;

export const LastName = styled(Name).attrs({
  type: "text",
  name: "lastName",
  placeholder: "Last name",
})``;

export const Gender = styled.select.attrs({
  name: "gender",
  id: "gender-select",
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

  option {
    font-family: "roboto";
  }
`;

export const PurposeOfUse = styled(Gender).attrs({
  name: "purposeOfUse",
  id: "purpose-select",
})``;
