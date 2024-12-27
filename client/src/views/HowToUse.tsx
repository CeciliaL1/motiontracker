import { Link } from "react-router";
import { LongText, Heading1 } from "../components/styled/styledTextContent";
import { Wrapper, ImageWrapper, LinkWrap } from "../components/styled/Wrappers";

export const HowToUse = () => {
  return (
    <>
      <Wrapper direction="row" margintop={15}>
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
            margin={10}
            src="public/how-to-use-motiontracker.webp"
            alt=""
          />
        </div>
        <LinkWrap margintop={5}>
          <Link to="/signup">Sign Up</Link>
          <i className="fa-solid fa-arrow-right"></i>
        </LinkWrap>
      </Wrapper>
    </>
  );
};
