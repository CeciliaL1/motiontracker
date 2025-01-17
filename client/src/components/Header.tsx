import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "../context/UserContext";
import { ActionUserType } from "../reducers/userReducer";
import { StyledHeader } from "./styled/styledLayouts";
import { NavMenu, NavMenuLoggedIn, HamburgerMenu } from "./styled/styledMenu";

export const Header = () => {
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
    dispatch({ type: ActionUserType.LOGOUT, payload: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <>
      <StyledHeader>
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
      </StyledHeader>
    </>
  );
};
