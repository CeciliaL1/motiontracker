import { Outlet } from "react-router";
import { Main } from "../components/styled/styledLayouts";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Layout = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/calendar", { replace: true });
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Main>
        <Outlet></Outlet>
      </Main>
      <Footer />
    </>
  );
};
