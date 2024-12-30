import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main } from "../components/styled/styledLayouts";
import { useContext, useState } from "react";
import { HamburgerMenu, NavMenu } from "../components/styled/styledMenu";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { ActionType } from "../reducers/userReducer";

export const Layout = () => {
  const { state, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleMenuClick = () => {
    if (open) {
      setOpen(!open);
    }
  };
  const handleLogOut = () => {
    dispatch({ type: ActionType.LOGOUT, payload: null });
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
        {!state.isAuthenticated && (
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
                <NavLink to="/" onClick={handleMenuClick}>
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
                <NavLink to="/howtouse" onClick={handleMenuClick}>
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
                <NavLink to="/signin" onClick={handleMenuClick}>
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
                <NavLink to="/signup" onClick={handleMenuClick}>
                  Sign up
                </NavLink>
              </motion.li>
            </ul>
          </NavMenu>
        )}

        {state.isAuthenticated && (
          <NavMenu open={open} background="D9D9D9" size="1.8">
            <ul>
              <li>
                <NavLink to="/profile">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/workout">
                  <i className="fa-solid fa-gears"></i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/calendar">
                  <i className="fa-regular fa-calendar"></i>
                </NavLink>
              </li>
              <li onClick={handleLogOut}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </li>
            </ul>
          </NavMenu>
        )}

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
