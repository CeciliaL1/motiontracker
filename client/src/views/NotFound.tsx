import { Link } from "react-router";
import {
  Heading1,
  NotFoundDescription,
} from "../components/styled/styledTextContent";
import {
  LinkWrap,
  NotFoundWrapper,
  Wrapper,
} from "../components/styled/Wrappers";

export const NotFound = () => {
  return (
    <>
      <NotFoundWrapper>
        <Wrapper direction="column" margintop={0} gap={20}>
          <Heading1>404</Heading1>
          <NotFoundDescription>
            Oops! The page you are looking for does not exist!
          </NotFoundDescription>
          <LinkWrap margintop={5} marginleft={0} fontSize={1} fontWeight={700}>
            <Link to="/">Go to start</Link>
          </LinkWrap>
        </Wrapper>
      </NotFoundWrapper>
    </>
  );
};
