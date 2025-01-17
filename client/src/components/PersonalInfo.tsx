import { Heading2 } from "./styled/styledTextContent";
import { Wrapper } from "./styled/Wrappers";

interface IPersonalInfoProps {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  diagnos: string;
  physicsLevel: number;
}

export const PersonalInfo = ({
  firstName,
  lastName,
  userName,
  email,
  age,
  gender,
  weight,
  height,
  diagnos,
  physicsLevel,
}: IPersonalInfoProps) => {
  return (
    <>
      <Wrapper
        backgroundColor="EEE7DA"
        padding={65}
        direction="column"
        margintop={1}
        gap={5}
        width={460}
      >
        <Heading2 marginbottom={20}>Personal information</Heading2>
        <p>
          Name:{" "}
          <span>
            {firstName} {lastName}
          </span>
        </p>
        <p>
          Username: <span>{userName}</span>
        </p>
        <p>
          Email: <span>{email}</span>
        </p>
      </Wrapper>
      <Wrapper
        backgroundColor="EEE7DA"
        padding={30}
        direction="column"
        margintop={1}
        gap={5}
        width={460}
      >
        <Heading2 marginbottom={20}>Workout specified information</Heading2>
        <>
          <p>
            Age: <span>{age}</span>
          </p>
          <p>
            Gender: <span>{gender}</span>
          </p>
          <p>
            Weight: <span>{weight} kg</span>
          </p>
          <p>
            Height: <span>{height} cm</span>
          </p>
          <p>
            Diagnos: <span>{diagnos}</span>
          </p>
          <p>
            Physics level: <span>{physicsLevel}</span>
          </p>
        </>
      </Wrapper>
    </>
  );
};
