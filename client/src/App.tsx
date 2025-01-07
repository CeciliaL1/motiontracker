import { RouterProvider } from "react-router";
import "./App.css";
import { Router } from "./Router";
import { useReducer, useEffect } from "react";
import { getLocalStorage } from "./helperfuntions/getLocalStorage";
import { IUserLogin } from "./models/IUsers";
import { UserReducer, ActionUserType } from "./reducers/userReducer";
import { UserContext } from "./context/UserContext";

function App() {
  const [state, dispatch] = useReducer(UserReducer, {
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const localStorageUser = getLocalStorage<IUserLogin>("user");

    if (Object.keys(localStorageUser).length > 0) {
      dispatch({ type: ActionUserType.LOGIN, payload: localStorageUser });
    } else {
      dispatch({ type: ActionUserType.LOGOUT, payload: null });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={Router}></RouterProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
