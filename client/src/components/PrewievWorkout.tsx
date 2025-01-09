import { IWorkoutScheduele } from "../models/IWorkout";

import { Wrapper } from "./styled/Wrappers";

interface IPreviewProps {
  schedule: IWorkoutScheduele;
}

export const PrewviewWorkout = ({ schedule }: IPreviewProps) => {
  console.log(schedule);
  return (
    <>
      <Wrapper direction="row" margintop={10}>
        <ul>
          {Object.keys(schedule).map((workout) => {
            const task = schedule[workout];
            return (
              <li key={workout}>
                <p>
                  {workout} : <span>{task.task} </span>
                  <span>{task.repetition} </span>
                  <span>{task.done} </span>{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </>
  );
};
