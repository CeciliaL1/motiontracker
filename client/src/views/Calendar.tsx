import { useEffect, useReducer, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IWorkout, IWorkoutDetailsResponse } from "../models/IWorkout";
import { getData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserLogin } from "../models/IUsers";
import { formatDate } from "../helperfuntions/formatDate";
import { Value } from "react-calendar/src/shared/types.js";
import { CalendarWrapper, Wrapper } from "../components/styled/Wrappers";

import { Heading2 } from "../components/styled/styledTextContent";
import { PreviewSingleWorkout } from "../components/PreviewSingleWorkout";
import { WorkoutContext } from "../context/WorkoutContext";
import { ActionWorkoutType, WorkoutReducer } from "../reducers/workoutReducer";

export const CalendarView = () => {
  const token = getLocalStorage<string>("token");
  const loggedInUser = getLocalStorage<IUserLogin>("user");
  const [value, setValue] = useState<Value>(new Date());
  const [workoutSchedule, dispatch] = useReducer(WorkoutReducer, {});

  const [clickedWorkout, setClickedWorkout] = useState<
    IWorkout[] | undefined
  >();
  const [clickedDate, setClickedDate] = useState<string>();

  useEffect(() => {
    const getWorkoutScheduele = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await getData<IWorkoutDetailsResponse[]>(
        `https://cecilial.hemsida.eu/api/workout/${loggedInUser.userId}`,
        headers
      );

      response.map((workout) => {
        const workoutDetails = workout.workoutDetails;
        if (typeof workoutDetails === "string") {
          const parsedDetails = JSON.parse(workoutDetails);
          dispatch({ type: ActionWorkoutType.TOGGLE, payload: parsedDetails });
        } else {
          dispatch({ type: ActionWorkoutType.TOGGLE, payload: workoutDetails });
        }
      });
    };

    getWorkoutScheduele();
  }, [token, loggedInUser.userId]);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateString = formatDate(date);

      const workout = workoutSchedule[dateString];
      if (workout) {
        const classNames = workout.map((work) => {
          const status = work.done ? "completed" : "not-completed";
          const taskClass = work.task ? "available" : "";
          return `${status} ${taskClass}`;
        });

        return classNames.join(" ");
      }
    }
    return null;
  };
  const handleClickDay = async (e: Date) => {
    const date = new Date(e);
    const dateString = formatDate(date);

    const workout = workoutSchedule[dateString];
    setClickedDate(dateString);
    setClickedWorkout(workout);
  };
  return (
    <>
      {Object.keys(workoutSchedule).length === 0 ? (
        <Wrapper direction="column" margintop={10}>
          <Heading2>Det finns inget träningsschema</Heading2>
        </Wrapper>
      ) : (
        <>
          <Wrapper direction="column" margintop={15}>
            <h1>Träningskalender</h1>
            <CalendarWrapper>
              <Calendar
                onClickDay={(e) => {
                  handleClickDay(e);
                }}
                onChange={setValue}
                value={value}
                tileClassName={tileClassName}
              />
            </CalendarWrapper>
          </Wrapper>
          <WorkoutContext.Provider value={{ workoutSchedule, dispatch }}>
            <PreviewSingleWorkout
              workoutSchedule={workoutSchedule}
              token={token}
              loggedInUser={loggedInUser}
              workout={clickedWorkout}
              date={clickedDate}
            ></PreviewSingleWorkout>
          </WorkoutContext.Provider>
        </>
      )}
    </>
  );
};
