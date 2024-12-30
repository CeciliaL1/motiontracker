import { RouterProvider } from "react-router";
import "./App.css";
import { Router } from "./Router";
import { useReducer, useEffect } from "react";
import { getLocalStorage } from "./helperfuntions/getLocalStorage";
import { IUserLogin } from "./models/IUsers";
import { UserReducer, ActionType } from "./reducers/userReducer";
import { UserContext } from "./context/UserContext";

function App() {
  const [state, dispatch] = useReducer(UserReducer, {
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkUser = async () => {
      const localStorageUser = await getLocalStorage<IUserLogin>("user");
      console.log(localStorageUser);

      if (Object.keys(localStorageUser).length > 0) {
        dispatch({ type: ActionType.LOGIN, payload: localStorageUser });
      } else {
        dispatch({ type: ActionType.LOGOUT, payload: null });
      }
    };
    checkUser();
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
