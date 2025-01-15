import { Link } from "react-router";
import { PrimaryButton } from "../components/styled/styledButtons";
import {
  Email,
  FirstName,
  Form,
  LastName,
  Name,
  Password,
} from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";
import { LinkWrap, Wrapper } from "../components/styled/Wrappers";
import { useState } from "react";
import { IUserLogin, IUserSignUp } from "../models/IUsers";
import { postData } from "../services/serviceBase";
import { validateInputs } from "../helperfuntions/validateInputs";
import { ErrorMessage } from "../components/styled/styledError";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    form: "",
  });

  const userData: IUserSignUp = {
    firstName: firstName,
    lastName: lastName,
    userEmail: userEmail,
    userName: userName,
    userPassword: userPassword,
  };

  const handleChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["form"]: "",
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setUserEmail(value);
        break;
      case "password":
        setUserPassword(value);
        break;
    }
    isInputvalid(field, value);
  };

  const isInputvalid = (field: string, value: string) => {
    const isValid = validateInputs(field, value);
    if (!isValid) {
      let errorMessage = "";
      switch (field) {
        case "email":
          errorMessage =
            'The email address seems to be incorrect. Please check that it contains an "@" symbol and a valid domain.';
          break;
        case "password":
          errorMessage =
            "Password must contain at least 8 character and contain letters, numbers and symbols '!&%'";
          break;
        default:
          errorMessage = "Must contain at least 2 characters";
          break;
      }
      setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userName || !firstName || !lastName || !userEmail || !userPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ["form"]: "You cant leave any fields empty",
      }));
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await postData<IUserSignUp, IUserLogin>(
      "https://cecilial.hemsida.eu/api/users/add",
      userData,
      headers
    );
    console.log(response);
  };

  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign up</Heading2>

          <FirstName
            aria-label="First Name"
            value={firstName}
            onChange={(e) => {
              handleChange("firstName", e.target.value);
            }}
          ></FirstName>
          {errors.firstName && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-firstname">{errors.firstName}</p>
            </ErrorMessage>
          )}

          <LastName
            aria-label="Last Name"
            value={lastName}
            onChange={(e) => {
              handleChange("lastName", e.target.value);
            }}
          ></LastName>
          {errors.lastName && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-lastname">{errors.lastName}</p>
            </ErrorMessage>
          )}
          <Email
            aria-label="Email address"
            value={userEmail}
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
          ></Email>
          {errors.email && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-email">{errors.email}</p>
            </ErrorMessage>
          )}
          <Name
            aria-label="User Name"
            value={userName}
            onChange={(e) => {
              handleChange("userName", e.target.value);
            }}
          ></Name>
          {errors.userName && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-username">{errors.userName}</p>
            </ErrorMessage>
          )}
          <Password
            aria-label="Password"
            value={userPassword}
            onChange={(e) => {
              handleChange("password", e.target.value);
            }}
          ></Password>
          {errors.password && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-password">{errors.password}</p>
            </ErrorMessage>
          )}

          <PrimaryButton
            id="signUpButton"
            margintop={50}
            marginbottom={10}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSignUp(e);
            }}
          >
            Sign up
          </PrimaryButton>
          {errors.form && (
            <ErrorMessage aria-live="assertive">
              <p id="error-message-form">{errors.form}</p>
            </ErrorMessage>
          )}
          <LinkWrap
            margintop={5}
            marginleft={250}
            fontsize={0.9}
            fontweight={500}
          >
            <Link to="/signin">Back to sign in</Link>
          </LinkWrap>
        </Form>
      </Wrapper>
    </>
  );
};
