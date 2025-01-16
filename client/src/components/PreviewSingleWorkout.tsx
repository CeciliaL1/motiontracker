import { useContext, useState } from "react";
import { IUserLogin } from "../models/IUsers";
import { IWorkoutScheduele } from "../models/IWorkout";
import { putData } from "../services/serviceBase";
import { PrimaryButton, SecondaryButton } from "./styled/styledButtons";
import { Heading1 } from "./styled/styledTextContent";
import { Wrapper } from "./styled/Wrappers";
import { ActionWorkoutType } from "../reducers/workoutReducer";
import { WorkoutContext } from "../context/WorkoutContext";
import { Ul } from "./styled/styledUl";
import { IResponse } from "../models/IUserProfile";

interface ISingleWorkoutProps {
  workoutSchedule: IWorkoutScheduele;
  date: string | undefined;
  token: string;
  loggedInUser: IUserLogin;
}

export const PreviewSingleWorkout = ({
  workoutSchedule,
  date,
  token,
  loggedInUser,
}: ISingleWorkoutProps) => {
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(WorkoutContext);

  if (!date || !workoutSchedule[date]) {
    return null;
  }

  const workoutsForDate = workoutSchedule[date];

  const completeAllWorkoutsForDate = async () => {
    const updatedWorkouts = workoutsForDate.map((work) => ({
      ...work,
      done: true,
    }));

    const updatedSchedule = { ...workoutSchedule, [date]: updatedWorkouts };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await putData<object, IResponse>(
      `https://cecilial.hemsida.eu/api/workout/update/${loggedInUser.userId}`,
      { workoutSchedule: updatedSchedule },
      headers
    );

    setMessage(response.message);
    setTimeout(() => {
      setMessage("");
    }, 1500);

    dispatch({ type: ActionWorkoutType.TOGGLE, payload: updatedSchedule });
  };

  const unCompleteAllWorkoutsForDate = async () => {
    const updatedWorkouts = workoutsForDate.map((work) => ({
      ...work,
      done: false,
    }));

    const updatedSchedule = { ...workoutSchedule, [date]: updatedWorkouts };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await putData<object, IResponse>(
      `https://cecilial.hemsida.eu/api/workout/update/${loggedInUser.userId}`,
      { workoutSchedule: updatedSchedule },
      headers
    );
    setMessage(response.message);
    setTimeout(() => {
      setMessage("");
    }, 1500);

    dispatch({ type: ActionWorkoutType.TOGGLE, payload: updatedSchedule });
  };

  return (
    <>
      <Wrapper direction="column" margintop={5} marginbottom={20}>
        {message && (
          <>
            <div aria-live="assertive">
              <p id="error-message">{message}</p>
            </div>
          </>
        )}
        <Wrapper direction="row" margintop={2} gap={100} marginbottom={7}>
          <Heading1>{date}</Heading1>
          <PrimaryButton
            aria-label="MMark workout as completed"
            onClick={completeAllWorkoutsForDate}
          >
            Mark workout as completed
          </PrimaryButton>
          <SecondaryButton
            aria-label="Unmark workout"
            onClick={unCompleteAllWorkoutsForDate}
          >
            Unmark Workout
          </SecondaryButton>
        </Wrapper>
        <div>
          {workoutsForDate.map((work, index) => (
            <Ul key={index}>
              <li>
                {work.task} {work.repetition}
              </li>
            </Ul>
          ))}
        </div>
      </Wrapper>
    </>
  );
};
