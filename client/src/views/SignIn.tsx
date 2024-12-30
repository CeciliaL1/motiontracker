import { Link } from "react-router";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/styled/styledButtons";
import { Email, Form, Password } from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";

import { LinkWrap, Wrapper } from "../components/styled/Wrappers";
import { useState } from "react";
import { postData } from "../services/serviceBase";

export const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      userEmail: userEmail,
      userPassword: userPassword,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await postData(
      "http://localhost:3000/api/users/login",
      data,
      headers
    );
    console.log(response);
  };
  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign in</Heading2>
          <Email
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></Email>
          <Password
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></Password>
          <LinkWrap
            margintop={5}
            marginleft={200}
            fontsize={0.9}
            fontweight={500}
          >
            <Link to="/forgotpassword">Forgot password?</Link>
          </LinkWrap>
          <PrimaryButton
            margintop={50}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSignIn(e);
            }}
          >
            Sign in
          </PrimaryButton>
          <Link to="/signup">
            <SecondaryButton margintop={15}>Sign up</SecondaryButton>
          </Link>
        </Form>
      </Wrapper>
    </>
  );
};
