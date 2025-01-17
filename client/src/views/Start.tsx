import { Link } from "react-router";
import { Heading1, LongText } from "../components/styled/styledTextContent";
import { ImageWrapper, LinkWrap, Wrapper } from "../components/styled/Wrappers";

export const Start = () => {
  return (
    <>
      <Wrapper direction="row" margintop={15} gap={20}>
        <LongText>
          <Heading1 margintop={30} marginbottom={50} marginleft={40}>
            Welcome to MotionTracker
          </Heading1>
          MotionTracker is a fitness tracker designed to empower individuals
          with conditions such as Ataxia, Parkinson’s, and Multiple Sclerosis to
          lead healthier, more active lives. Using AI, the app develops
          personalized training schedules tailored to specific workout goals,
          taking into account the unique needs of users living with these
          conditions.
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
