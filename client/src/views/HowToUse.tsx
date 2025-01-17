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
          Once you set up your account and sign in, you can customize your
          profile by adding your personal details and workout preferences. After
          setting this up, you can generate a personalized workout plan. When
          you're satisfied with your schedule, simply save it to your calendar.
          The calendar provides an overview of your entire workout schedule,
          allowing you to click on specific dates to mark workouts as completed
          or adjust them as needed.
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
            <Link aria-label="Link to sign in" to="/signin">
              Sign in
            </Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
          <LinkWrap
            margintop={15}
            marginleft={250}
            fontsize={1}
            fontweight={700}
          >
            <Link aria-label="Link to sign up" to="/signup">
              Sign up
            </Link>
            <i className="fa-solid fa-arrow-right"></i>
          </LinkWrap>
        </Wrapper>
      </Wrapper>
    </>
  );
};
