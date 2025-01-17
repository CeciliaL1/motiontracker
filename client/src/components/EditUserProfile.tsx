import { StringFields, NumberFields } from "../models/FieldsType";
import {
  Name,
  Email,
  TextInput,
  Gender,
  PurposeOfUse,
} from "./styled/styledInputs";
import { Heading2 } from "./styled/styledTextContent";
import { Wrapper } from "./styled/Wrappers";

interface IEditPersonalInfoProps {
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
  handleFieldChange: (
    field: StringFields | NumberFields,
    value: string
  ) => void;
}

export const EditUserProfile = ({
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
  handleFieldChange,
}: IEditPersonalInfoProps) => {
  return (
    <>
      <Wrapper
        backgroundColor="EEE7DA"
        direction="column"
        padding={30}
        margintop={1}
        gap={5}
      >
        <Heading2 marginbottom={20}>Personal information</Heading2>
        <Name
          aria-label="First Name"
          value={firstName}
          onChange={(e) => handleFieldChange("firstName", e.target.value)}
        ></Name>
        <Name
          aria-label="Last name"
          value={lastName}
          onChange={(e) => handleFieldChange("lastName", e.target.value)}
        ></Name>
        <Name
          aria-label="User name"
          value={userName}
          onChange={(e) => handleFieldChange("userName", e.target.value)}
        ></Name>
        <Email
          aria-label="Email"
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
        ></Email>
      </Wrapper>
      <Wrapper
        backgroundColor="EEE7DA"
        direction="column"
        padding={30}
        margintop={1}
        gap={5}
      >
        <Heading2 marginbottom={20}>Workout specified information</Heading2>

        <>
          <TextInput
            aria-label="Age"
            placeholder="Age"
            name="Age"
            value={age !== 0 ? age : ""}
            onChange={(e) => {
              handleFieldChange("age", e.target.value);
            }}
          ></TextInput>
          <Gender
            value={gender}
            onChange={(e) => handleFieldChange("gender", e.target.value)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="Do not want to specify">
              Do not want to specify
            </option>
          </Gender>
          <TextInput
            aria-label="Weight in kg"
            placeholder="Weight in kg"
            name="Weight"
            value={weight !== 0 ? weight : ""}
            onChange={(e) => handleFieldChange("weight", e.target.value)}
          ></TextInput>
          <TextInput
            aria-label="Height in cm"
            placeholder="Height in cm "
            name="Height"
            value={height !== 0 ? height : ""}
            onChange={(e) => handleFieldChange("height", e.target.value)}
          ></TextInput>
          <PurposeOfUse
            value={diagnos}
            onChange={(e) => handleFieldChange("diagnos", e.target.value)}
          >
            <option value="Ataxia">Ataxia</option>
            <option value="Parkinsson">Parkinsson</option>
            <option value="Multiple sclerosis">Multiple sclerosis</option>
          </PurposeOfUse>
          <TextInput
            aria-label="Physics level, 1-10"
            placeholder="Physics level, 1-10"
            name="PhysicsLevel"
            value={physicsLevel !== 0 ? physicsLevel : ""}
            onChange={(e) => handleFieldChange("physicsLevel", e.target.value)}
          ></TextInput>
        </>
      </Wrapper>
    </>
  );
};
