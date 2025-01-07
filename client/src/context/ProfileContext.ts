import { createContext } from "react";
import { IProfileAction } from "../reducers/profileReducer";



interface IProfileContext {
    state: boolean,
    dispatch: React.Dispatch<IProfileAction>
}

export const ProfileContext = createContext<IProfileContext>({state: false, dispatch: () => null});