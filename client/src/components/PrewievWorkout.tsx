import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserLogin } from "../models/IUsers";
import { ISaveWorkout, IWorkoutScheduele } from "../models/IWorkout";
import { postData } from "../services/serviceBase";
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
  const loggedInUser = getLocalStorage<IUserLogin>("user");
  const token = getLocalStorage<string>("token");

  const data = {
    workoutDetails: schedule,
    userId: loggedInUser.userId,
  };
  console.log(schedule);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleSaveWorkout = async () => {
    const response = await postData<ISaveWorkout, IWorkoutScheduele>(
      "http://localhost:3000/api/workout/create",
      data,
      headers
    );

    console.log(response);
  };

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
