import { Link } from "react-router";
import { Heading1, LongText } from "../components/styled/styledTextContent";
import { ImageWrapper, LinkWrap, Wrapper } from "../components/styled/Wrappers";

export const Start = () => {
  return (
    <>
      <Wrapper direction="row" margintop={15}>
        <LongText>
          <Heading1 margintop={30} marginbottom={50} marginleft={40}>
            Welcome to MotionTracker
          </Heading1>
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
            src="public/image-front-page-motiontracker.webp"
            alt="An AI generated image that illustrate a screen with different workout options and around it are people who are working out."
          />
          <LinkWrap
            margintop={5}
            marginleft={250}
            fontsize={1}
            fontweight={700}
          >
            <Link to="/howtouse">How to use</Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
        </div>
      </Wrapper>
    </>
  );
};
