import { Link } from "react-router";
import { PrimaryButton } from "../components/styled/styledButtons";
import {
  Email,
  FirstName,
  Form,
  Gender,
  LastName,
  Name,
  Password,
  PurposeOfUse,
} from "../components/styled/styledInputs";
import { Heading2 } from "../components/styled/styledTextContent";
import { LinkWrap, Wrapper } from "../components/styled/Wrappers";

export const SignUp = () => {
  return (
    <>
      <Wrapper direction="column" margintop={15}>
        <Form>
          <Heading2 marginbottom={20}>Sign up</Heading2>
          <FirstName></FirstName>
          <LastName></LastName>
          <Email></Email>
          <Name></Name>
          <Password></Password>
          <Gender>
            <option value="">Gender</option>
            <option value="woman">Woman</option>
            <option value="man">Man</option>
            <option value="PreferNotToAnswer">Prefer not to specify</option>
          </Gender>
          <PurposeOfUse>
            <option value="">Purpose of use</option>
            <option value="ataxia">Ataxia</option>
            <option value="parkinsson">Parkinssons</option>
            <option value="multipleSclerosis">Multiple sclerosis</option>
            <option value="healthCareWorker">Health care worker</option>
          </PurposeOfUse>

          <PrimaryButton margintop={50} marginbottom={10}>
            Sign up
          </PrimaryButton>
          <LinkWrap
            margintop={5}
            marginleft={250}
            fontSize={0.9}
            fontWeight={500}
          >
            <Link to="/signin">Back to sign in</Link>
          </LinkWrap>
        </Form>
      </Wrapper>
    </>
  );
};
