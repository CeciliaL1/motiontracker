import { createContext } from "react";

import { IWorkoutAction } from "../reducers/workoutReducer";
import {  IWorkoutScheduele } from "../models/IWorkout";

interface IWorkoutContext {
    workoutSchedule: IWorkoutScheduele;
    dispatch: React.Dispatch<IWorkoutAction>
}

export const WorkoutContext = createContext<IWorkoutContext>({
    workoutSchedule: {'':{task:'', repetition:'', done: false}}, dispatch: () => null
})