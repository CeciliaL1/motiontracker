import { IUserLogin } from "../models/IUsers";


export interface IInitialState  {
    isAuthenticated: boolean;
    user: IUserLogin | null
  };
  export interface IAction {
    type: ActionType; 
    payload: IUserLogin | null;
};
export enum ActionType {
    LOGIN,
    LOGOUT
}
  
  export const UserReducer = (state: IInitialState, action: IAction) => {
    switch (action.type) {
      case ActionType.LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload, 
        };
      case ActionType.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  