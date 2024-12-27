import { Link } from "react-router";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/styled/styledButtons";
import { Form, Name, Password } from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";

import { LinkWrap, Wrapper } from "../components/styled/Wrappers";

export const SignIn = () => {
  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign in</Heading2>
          <Name></Name>
          <Password></Password>
          <LinkWrap
            margintop={5}
            marginleft={200}
            fontSize={0.9}
            fontWeight={500}
          >
            <Link to="/forgotpassword">Forgot password?</Link>
          </LinkWrap>
          <PrimaryButton margintop={50}>Sign in</PrimaryButton>
          <Link to="/signup">
            <SecondaryButton margintop={15}>Sign up</SecondaryButton>
          </Link>
        </Form>
      </Wrapper>
    </>
  );
};
