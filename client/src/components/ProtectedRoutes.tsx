import { ReactElement, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface IProtectedRouteProps {
  element: ReactElement;
}

export const ProtectedRoute = ({ element }: IProtectedRouteProps) => {
  const { state } = useContext(UserContext);
  return state.isAuthenticated ? element : <Navigate to="/" replace />;
};
