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

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userData: IUserSignUp = {
    firstName: firstName,
    lastName: lastName,
    userEmail: userEmail,
    userName: userName,
    userPassword: userPassword,
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await postData<IUserSignUp, IUserLogin>(
      "http://localhost:3000/api/users/add",
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
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></FirstName>
          <LastName
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></LastName>
          <Email
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></Email>
          <Name
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Name>
          <Password
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></Password>

          <PrimaryButton
            margintop={50}
            marginbottom={10}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSignUp(e);
            }}
          >
            Sign up
          </PrimaryButton>
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
