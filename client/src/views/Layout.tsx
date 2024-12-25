import { NavLink, Outlet } from "react-router";
import { Header } from "../components/styled/styledLayouts";
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
          <img src="./src/assets/motiontracker_svg.svg" alt="" />
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
      <main>
        <Outlet></Outlet>
      </main>
      <footer>Footer</footer>
    </>
  );
};
