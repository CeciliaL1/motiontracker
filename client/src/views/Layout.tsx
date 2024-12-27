import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main } from "../components/styled/styledLayouts";
import { useState } from "react";
import { HamburgerMenu, NavMenu } from "../components/styled/styledMenu";
import { motion } from "framer-motion";

export const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Header>
        <motion.a
          href="#"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,

            transition: {
              duration: 1,
            },
          }}
        >
          <img src="public/motiontracker_svg.svg" alt="" />
        </motion.a>

        <NavMenu open={open}>
          <ul>
            <motion.li
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }}
              whileHover={{ scale: 1.2 }}
            >
              <NavLink to="/" onClick={handleClick}>
                Start
              </NavLink>
            </motion.li>
            <motion.li
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }}
              whileHover={{ scale: 1.2 }}
            >
              <NavLink to="/howtouse" onClick={handleClick}>
                How to use
              </NavLink>
            </motion.li>
            <motion.li
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }}
              whileHover={{ scale: 1.2 }}
            >
              {" "}
              <NavLink to="/signin" onClick={handleClick}>
                Sign in
              </NavLink>
            </motion.li>
            <motion.li
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,

                transition: {
                  duration: 1,
                },
              }}
              whileHover={{ scale: 1.2 }}
            >
              {" "}
              <NavLink to="/signup" onClick={handleClick}>
                Sign up
              </NavLink>
            </motion.li>
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
