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
import { setLocalStorage } from "../helperfuntions/setLocalStorage";
import { ILoggedIn, ILoginUser } from "../models/IUsers";

export const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputClick = () => {
    setIsError(false);
  };
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userData: ILoginUser = {
      userEmail: userEmail,
      userPassword: userPassword,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await postData<ILoginUser, ILoggedIn>(
      "http://localhost:3000/api/users/login",
      userData,
      headers
    );
    if (response.message) {
      setErrorMessage(response.message);
      setIsError(true);
    }
    setLocalStorage("user", response.user);
    setLocalStorage("token", response.token);
  };
  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign in</Heading2>
          {isError && (
            <>
              <div>
                <p>{errorMessage}</p>
              </div>
            </>
          )}
          <Email
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            onClick={handleInputClick}
          ></Email>
          <Password
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            onClick={handleInputClick}
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
