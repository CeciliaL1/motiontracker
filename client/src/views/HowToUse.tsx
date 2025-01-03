import { Link } from "react-router";
import { LongText, Heading1 } from "../components/styled/styledTextContent";
import { Wrapper, ImageWrapper, LinkWrap } from "../components/styled/Wrappers";

export const HowToUse = () => {
  return (
    <>
      <Wrapper direction="row" margintop={15} gap={20}>
        <LongText>
          <Heading1 margintop={30} marginbottom={50} marginleft={40}>
            How to use MotionTracker
          </Heading1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </LongText>
        <Wrapper direction="column" margintop={0.5} gap={7}>
          <ImageWrapper
            width={350}
            margin={10}
            src="public/how-to-use-motiontracker.webp"
            alt="An AI generated image that illustrate a screen with a woman explaning how to use the app."
          />
          <LinkWrap
            margintop={5}
            marginleft={250}
            fontsize={1}
            fontweight={700}
          >
            <Link to="/signin">Sign in</Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
          <LinkWrap
            margintop={15}
            marginleft={250}
            fontsize={1}
            fontweight={700}
          >
            <Link to="/signup">Sign up</Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
        </Wrapper>
      </Wrapper>
    </>
  );
};
