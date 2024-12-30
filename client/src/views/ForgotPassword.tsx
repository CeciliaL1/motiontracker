import { Link } from "react-router";
import { PrimaryButton } from "../components/styled/styledButtons";
import { Email, Form } from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";
import { LinkWrap, Wrapper } from "../components/styled/Wrappers";

export const ForgotPassword = () => {
  return (
    <>
      <Wrapper direction="colum" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Forgot password</Heading2>
          <Email></Email>
          <PrimaryButton marginbottom={10}>Send</PrimaryButton>
          <LinkWrap
            margintop={15}
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
