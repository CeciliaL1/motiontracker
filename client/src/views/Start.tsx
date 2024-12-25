import { Link } from "react-router";
import {
  Heading1,
  LinkWrap,
  LongText,
} from "../components/styled/styledTextContent";
import { ImageWrapper, Wrapper } from "../components/styled/Wrappers";

export const Start = () => {
  return (
    <>
      <Wrapper direction="row">
        <LongText>
          <Heading1>Welcome to MotionTracker</Heading1>
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
            src="./src/assets/image-front-page-motiontracker.webp"
            alt=""
          />
          <LinkWrap>
            <Link to="/howtouse">How to use</Link>
            <i class="fa-solid fa-arrow-right"></i>
          </LinkWrap>
        </div>
      </Wrapper>
    </>
  );
};
