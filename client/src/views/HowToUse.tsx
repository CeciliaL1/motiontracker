import { Link } from "react-router";
import {
  LongText,
  Heading1,
  LinkWrap,
} from "../components/styled/styledTextContent";
import { Wrapper, ImageWrapper } from "../components/styled/Wrappers";

export const HowToUse = () => {
  return (
    <>
      <Wrapper direction="row">
        <LongText>
          <Heading1>How to use MotionTracker</Heading1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </LongText>
        <div>
          <ImageWrapper
            width={350}
            margin={50}
            src="./src/assets/how-to-use-motiontracker.webp"
            alt=""
          />
          <LinkWrap>
            <Link to="/signup">Sign Up</Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
        </div>
      </Wrapper>
    </>
  );
};
