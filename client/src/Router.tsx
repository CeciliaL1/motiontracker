import { createBrowserRouter } from "react-router";
import { Layout } from "./views/Layout";
import { NotFound } from "./views/NotFound";
import { SignIn } from "./views/SignIn";
import { SignUp } from "./views/SignUp";
import { Profile } from "./views/Profile";
import { GenerateWorkout } from "./views/GenerateWorkout";
import { CalendarView } from "./views/Calendar";
import { Start } from "./views/Start";
import { HowToUse } from "./views/HowToUse";
import { ForgotPassword } from "./views/ForgotPassword";
import { ProtectedRoute } from "./components/ProtectedRoutes";

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
        element: (
          <ProtectedRoute element={<Profile></Profile>}></ProtectedRoute>
        ),
      },
      {
        path: "/workout",
        element: (
          <ProtectedRoute
            element={<GenerateWorkout></GenerateWorkout>}
          ></ProtectedRoute>
        ),
      },
      {
        path: "/calendar",
        element: (
          <ProtectedRoute
            element={<CalendarView></CalendarView>}
          ></ProtectedRoute>
        ),
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);
