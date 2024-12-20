import { createBrowserRouter } from "react-router";
import { Layout } from "./views/Layout";
import { NotFound } from "./views/NotFound";
import { SignIn } from "./views/SignIn";
import { SignUp } from "./views/SignUp";
import { Profile } from "./views/Profile";
import { GenerateWorkout } from "./views/GenerateWorkout";
import { Calendar } from "./views/Calendar";
import { Home } from "./views/Home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/workout",
        element: <GenerateWorkout></GenerateWorkout>,
      },
      {
        path: "/calender",
        element: <Calendar></Calendar>,
      },
    ],
  },
]);
