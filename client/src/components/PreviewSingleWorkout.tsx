import { useContext } from "react";
import { IUserLogin } from "../models/IUsers";
import { IWorkout, IWorkoutScheduele } from "../models/IWorkout";
import { putData } from "../services/serviceBase";
import { PrimaryButton, SecondaryButton } from "./styled/styledButtons";
import { Heading1 } from "./styled/styledTextContent";
import { Wrapper } from "./styled/Wrappers";
import { ActionWorkoutType } from "../reducers/workoutReducer";
import { WorkoutContext } from "../context/WorkoutContext";

interface ISingleWorkoutProps {
  workout: IWorkout | undefined;
  date: string | undefined;
  token: string;
  loggedInUser: IUserLogin;
  workoutSchedule: IWorkoutScheduele;
}

export const PreviewSingleWorkout = ({
  workout,
  date,
  token,
  loggedInUser,
  workoutSchedule,
}: ISingleWorkoutProps) => {
  const { dispatch } = useContext(WorkoutContext);
  if (!workout) {
    return;
  }

  const completeWorkout = async () => {
    if (workout) {
      workout.done = true;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await putData<object, string>(
      `https://cecilial.hemsida.eu/api/workout/update/${loggedInUser.userId}`,
      { workoutSchedule },
      headers
    );

    console.log(response);
    dispatch({ type: ActionWorkoutType.TOGGLE, payload: workoutSchedule });
  };

  const unCompleteWorkout = async () => {
    if (workout) {
      workout.done = false;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await putData<object, string>(
      `https://cecilial.hemsida.eu/api/workout/update/${loggedInUser.userId}`,
      { workoutSchedule },
      headers
    );
    console.log(response);

    dispatch({ type: ActionWorkoutType.TOGGLE, payload: workoutSchedule });
  };
  return (
    <>
      <Wrapper direction="column" margintop={5} marginbottom={20}>
        <Wrapper direction="row" margintop={2} gap={100} marginbottom={7}>
          <Heading1>{date}</Heading1>
          <PrimaryButton aria-label="Workout completed" onClick={completeWorkout}>
            Workout completed
          </PrimaryButton>
          <SecondaryButton aria-label="Unmark completed workout" onClick={unCompleteWorkout}>
            Unmark workout
          </SecondaryButton>
        </Wrapper>
        <div>
          {workout.task} - {workout.repetition}
        </div>
      </Wrapper>
    </>
  );
};
