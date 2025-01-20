import { Link } from "react-router";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/styled/styledButtons";
import { Email, Form, Password } from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";

import { LinkWrap, Wrapper } from "../components/styled/Wrappers";
import { useContext, useState } from "react";
import { postData } from "../services/serviceBase";
import { setLocalStorage } from "../helperfuntions/setLocalStorage";
import { ILoggedIn, ILoginUser } from "../models/IUsers";
import { ActionUserType } from "../reducers/userReducer";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputClick = () => {
    setIsError(false);
  };
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = new Date();

    const userData: ILoginUser = {
      userEmail: userEmail,
      userPassword: userPassword,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await postData<ILoginUser, ILoggedIn>(
        "https://cecilial.hemsida.eu/api/users/login",
        userData,
        headers
      );
      if (response.message) {
        setErrorMessage(response.message);
        setIsError(true);
        dispatch({ type: ActionUserType.WRONG, payload: null });
        console.log(response);
      } else {
        setLocalStorage("user", response.user);
        setLocalStorage("token", response.token);
        setLocalStorage("generated", 0);
        setLocalStorage("date", date.toDateString());

        navigate("/calendar");
        dispatch({ type: ActionUserType.LOGIN, payload: response.user });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setIsError(true);
    }
  };
  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign in</Heading2>
          {isError && (
            <>
              <div aria-live="assertive">
                <p id="error-message">{errorMessage}</p>
              </div>
            </>
          )}
          <Email
            aria-label="Email address"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            onClick={handleInputClick}
          ></Email>
          <Password
            aria-label="Password"
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
            <Link aria-label="Forgot password" to="/forgotpassword">
              Forgot password?
            </Link>
          </LinkWrap>
          <PrimaryButton
            aria-label="Sign in Button"
            margintop={50}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSignIn(e);
            }}
            id="signInButton"
          >
            Sign in
          </PrimaryButton>
          <Link aria-label="go to sign up" to="/signup">
            <SecondaryButton margintop={15}>Sign up</SecondaryButton>
          </Link>
        </Form>
      </Wrapper>
    </>
  );
};
