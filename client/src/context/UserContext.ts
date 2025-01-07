import { createContext } from "react";

import { IUserAction, IInitialState } from "../reducers/userReducer";

interface IUserContext {
    state: IInitialState;
    dispatch: React.Dispatch<IUserAction>
}

export const UserContext = createContext<IUserContext>({state: {isAuthenticated: false, user: null},
    dispatch: () => null})