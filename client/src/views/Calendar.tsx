import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IWorkoutDetailsResponse, IWorkoutScheduele } from "../models/IWorkout";
import { getData, putData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserLogin } from "../models/IUsers";
import { formatDate } from "../helperfuntions/formatDate";
import { Value } from "react-calendar/src/shared/types.js";
import { CalendarWrapper, Wrapper } from "../components/styled/Wrappers";

import { Heading2 } from "../components/styled/styledTextContent";

export const CalendarView = () => {
  const token = getLocalStorage<string>("token");
  const loggedInUser = getLocalStorage<IUserLogin>("user");
  const [value, setValue] = useState<Value>(new Date());
  const [workoutSchedule, setWorkoutSchedule] = useState<IWorkoutScheduele>({});

  useEffect(() => {
    const getWorkoutScheduele = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await getData<IWorkoutDetailsResponse[]>(
        `http://localhost:3000/api/workout/${loggedInUser.userId}`,
        headers
      );
      response.map((workout) => {
        setWorkoutSchedule(workout.workoutDetails);
      });
    };
    getWorkoutScheduele();
  }, [setWorkoutSchedule, token, loggedInUser.userId]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateString = formatDate(date);
      const workout = workoutSchedule[dateString];
      if (workout) {
        return (
          <div>
            <p>{workout.task}</p>
            <p>{workout.repetition} reps</p>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateString = formatDate(date);
      const workout = workoutSchedule[dateString];
      if (workout) {
        return workout.done ? "completed" : "not-completed";
      }
    }
    return null;
  };
  const handleClickDay = async (e: Date) => {
    const date = new Date(e);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);

    const dateString = `${day}/${month}`;

    const workout = workoutSchedule[dateString];
    if (workout) {
      workout.done = !workout.done;
    }
    console.log(workoutSchedule);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await putData<IWorkoutScheduele, string>(
      `http://localhost:3000/api/workout/update/${loggedInUser.userId}`,
      { workoutSchedule },
      headers
    );

    console.log(response);
  };
  return (
    <>
      {!workoutSchedule ? (
        <Wrapper direction="column" margintop={10}>
          <Heading2>Det finns inget träningsschema</Heading2>
        </Wrapper>
      ) : (
        <Wrapper direction="column" margintop={15}>
          <h1>Träningskalender</h1>
          <CalendarWrapper>
            <Calendar
              onClickDay={(e) => {
                handleClickDay(e);
              }}
              onChange={setValue}
              value={value}
              tileContent={tileContent}
              tileClassName={tileClassName}
            />
          </CalendarWrapper>
        </Wrapper>
      )}
    </>
  );
};
