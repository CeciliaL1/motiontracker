import { NavLink, Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>Footer</footer>
    </>
  );
};
