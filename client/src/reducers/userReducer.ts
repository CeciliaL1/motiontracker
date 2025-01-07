import { IUserLogin } from "../models/IUsers";


export interface IInitialState  {
    isAuthenticated: boolean;
    user: IUserLogin | null
  };
  export interface IUserAction {
    type: ActionUserType; 
    payload: IUserLogin | null;
};
export enum ActionUserType {
    LOGIN,
    LOGOUT
}
  
  export const UserReducer = (state: IInitialState, action: IUserAction) => {
    switch (action.type) {
      case ActionUserType.LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload, 
        };
      case ActionUserType.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  