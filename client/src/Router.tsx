import { createBrowserRouter } from "react-router";
import { Layout } from "./views/Layout";
import { NotFound } from "./views/NotFound";
import { SignIn } from "./views/SignIn";
import { SignUp } from "./views/SignUp";
import { Profile } from "./views/Profile";
import { GenerateWorkout } from "./views/GenerateWorkout";
import { Calendar } from "./views/Calendar";
import { Start } from "./views/Start";
import { HowToUse } from "./views/HowToUse";
import { ForgotPassword } from "./views/ForgotPassword";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Start></Start>,
      },
      {
        path: "/howtouse",
        element: <HowToUse></HowToUse>,
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
        path: "/calendar",
        element: <Calendar></Calendar>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);
