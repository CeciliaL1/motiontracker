import { IWorkoutScheduele } from "../models/IWorkout";
import { Wrapper } from "./styled/Wrappers";

interface IPreviewProps {
  schedule: IWorkoutScheduele;
}

export const PrewviewWorkout = ({ schedule }: IPreviewProps) => {
  return (
    <>
      <Wrapper direction="row" margintop={10}>
        {schedule.date}
      </Wrapper>
    </>
  );
};
