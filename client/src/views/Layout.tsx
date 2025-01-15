import { Link, NavLink, Outlet } from "react-router";
import { Footer, Header, Main } from "../components/styled/styledLayouts";
import { useContext, useEffect, useState } from "react";
import {
  HamburgerMenu,
  NavMenu,
  NavMenuLoggedIn,
} from "../components/styled/styledMenu";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { ActionUserType } from "../reducers/userReducer";
import { useNavigate } from "react-router";

export const Layout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/calendar", { replace: true });
    }
  }, [state.isAuthenticated, navigate]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleMenuClick = () => {
    if (open) {
      setOpen(!open);
    }
  };
  const handleLogOut = () => {
    dispatch({ type: ActionUserType.LOGOUT, payload: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <>
      <Header>
        <motion.a
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
          {state.isAuthenticated ? (
            <Link to="/calendar">
              <img src="public/motiontracker_svg.svg" alt="" />
            </Link>
          ) : (
            <Link to="/">
              <img src="public/motiontracker_svg.svg" alt="" />
            </Link>
          )}
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
                <NavLink
                  aria-label="Navigation link to start"
                  to="/"
                  onClick={handleMenuClick}
                >
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
                <NavLink
                  aria-label="Navigation link to how to use"
                  to="/howtouse"
                  onClick={handleMenuClick}
                >
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
                <NavLink
                  aria-label="Navigation link to Sign in"
                  to="/signin"
                  onClick={handleMenuClick}
                >
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
                <NavLink
                  aria-label="Navigation link to sign up"
                  to="/signup"
                  onClick={handleMenuClick}
                >
                  Sign up
                </NavLink>
              </motion.li>
            </ul>
          </NavMenu>
        )}

        {state.isAuthenticated && (
          <NavMenuLoggedIn background="D9D9D9" size="1.2">
            <ul>
              <li>
                <NavLink aria-label="Navigation link to profile" to="/profile">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Navigation link to Generate workout"
                  to="/workout"
                >
                  <i className="fa-solid fa-gears"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Navigation link to calendar"
                  to="/calendar"
                >
                  <i className="fa-regular fa-calendar"></i>
                </NavLink>
              </li>
              <li onClick={handleLogOut}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </li>
            </ul>
          </NavMenuLoggedIn>
        )}
        {!state.isAuthenticated && (
          <HamburgerMenu aria-label="Meny" open={open} onClick={handleClick}>
            <div></div>
            <div></div>
            <div></div>
          </HamburgerMenu>
        )}
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
            <a aria-label="email address" href="#">
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
      </Footer>
    </>
  );
};
