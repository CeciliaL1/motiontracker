import {  IWorkoutScheduele } from "../models/IWorkout";


  export interface IWorkoutAction {
    type: ActionWorkoutType; 
    payload: IWorkoutScheduele;
};
export enum ActionWorkoutType {
    TOGGLE
}
export const WorkoutReducer = (workout: IWorkoutScheduele, action: IWorkoutAction) => {
switch (action.type) {
    case ActionWorkoutType.TOGGLE: 
    return action.payload || workout;
    default:
        return workout;
}
}