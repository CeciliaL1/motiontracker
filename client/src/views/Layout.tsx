import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main } from "../components/styled/styledLayouts";
import { useState } from "react";
import { HamburgerMenu, NavMenu } from "../components/styled/styledMenu";

export const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Header>
        <a href="#">
          <img src="public/motiontracker_svg.svg" alt="" />
        </a>

        <NavMenu open={open}>
          <ul>
            <li>
              <NavLink to="/" onClick={handleClick}>
                Start
              </NavLink>
            </li>
            <li>
              <NavLink to="/howtouse" onClick={handleClick}>
                How to use
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/signin" onClick={handleClick}>
                Sign in
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/signup" onClick={handleClick}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </NavMenu>

        <HamburgerMenu open={open} onClick={handleClick}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>
      </Header>
      <Main>
        <Outlet></Outlet>
      </Main>
      <Footer>
        <section>
          <h2>MotionTracker</h2>
          <a href="#">
            <img src="public/motiontracker_svg.svg" alt="" />
          </a>
        </section>
        <section>
          <div>ThisAddress 345</div>
          <div>
            <a href="#">info@motiontracker.se</a>
            <a href="#">070 123 45 67</a>
          </div>
        </section>
        <section>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
        </section>
      </Footer>
    </>
  );
};
