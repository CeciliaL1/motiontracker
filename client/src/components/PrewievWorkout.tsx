import { IWorkoutScheduele } from "../models/IWorkout";
import { Spinner } from "./Spinner";
import { PrimaryButton } from "./styled/styledButtons";
import { Heading2 } from "./styled/styledTextContent";
import { Ul } from "./styled/styledUl";

import { Wrapper } from "./styled/Wrappers";

interface IPreviewProps {
  schedule: IWorkoutScheduele;
  isLoading: boolean;
}

export const PrewviewWorkout = ({ schedule, isLoading }: IPreviewProps) => {
  const schedueleLength = Object.keys(schedule).length;

  const handleSaveWorkout = () => {};
  return (
    <>
      <Wrapper direction="column" margintop={10}>
        {isLoading ? (
          <Spinner></Spinner>
        ) : schedueleLength === 1 ? (
          <Heading2>No workout to display</Heading2>
        ) : (
          schedueleLength > 1 && (
            <>
              <Ul>
                {Object.keys(schedule).map((workout) => {
                  const task = schedule[workout];
                  return (
                    <li key={workout}>
                      <h4>{workout}</h4>
                      <p>{task.task}</p>
                      <p>{task.repetition}</p>
                    </li>
                  );
                })}
              </Ul>
              <PrimaryButton marginbottom={100} onClick={handleSaveWorkout}>
                Save workout
              </PrimaryButton>
            </>
          )
        )}
      </Wrapper>
    </>
  );
};
