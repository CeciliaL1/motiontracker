import { StyledFooter } from "./styled/styledLayouts";
import { Heading1 } from "./styled/styledTextContent";

export const Footer = () => {
  return (
    <>
      <StyledFooter>
        <section>
          <Heading1>MotionTracker</Heading1>
          <a href="#">
            <img src="public/motiontracker_svg.svg" alt="" />
          </a>
        </section>
        <section>
          <p>This Address 123</p>
          <div>
            <a aria-label="email address" href="mailto:info@motiontracker.se">
              info@motiontracker.se
            </a>
            <a aria-label="Phone number" href="#">
              070 123 45 67
            </a>
          </div>
        </section>
        <section>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
        </section>
      </StyledFooter>
    </>
  );
};
