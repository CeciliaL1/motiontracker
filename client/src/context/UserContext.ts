import { createContext } from "react";

import { IAction, IInitialState } from "../reducers/userReducer";

interface IUserContext {
    state: IInitialState;
    dispatch: React.Dispatch<IAction>
}

export const UserContext = createContext<IUserContext>({state: {isAuthenticated: false, user: null},
    dispatch: () => null})