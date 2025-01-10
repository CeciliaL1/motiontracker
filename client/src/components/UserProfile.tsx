import { useContext, useEffect, useState } from "react";
import { IResponse, IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { Wrapper } from "./styled/Wrappers";
import { ProfileContext } from "../context/ProfileContext";
import { PrimaryButton } from "./styled/styledButtons";
import { ActionProfileType } from "../reducers/profileReducer";
import { Email, Name, TextInput } from "./styled/styledInputs";
import { Heading2 } from "./styled/styledTextContent";
import { putData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";

interface IUserProfileProps {
  userProfile: IUserProfile[];
  loggedInUser: IUserLogin;
}

export const UserProfile = ({
  userProfile,
  loggedInUser,
}: IUserProfileProps) => {
  const { state, dispatch } = useContext(ProfileContext);
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState(loggedInUser.firstName);
  const [lastName, setLastName] = useState(loggedInUser.lastName);
  const [userName, setUserName] = useState(loggedInUser.userName);
  const [email, setEmail] = useState(loggedInUser.email);

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [diagnos, setDiagnos] = useState("");
  const [physicsLevel, setPhysicsLevel] = useState(0);

  useEffect(() => {
    userProfile.map((user) => {
      setAge(user.age);
      setGender(user.gender);
      setWeight(user.weight);
      setHeight(user.height);
      setDiagnos(user.healthIssues);
      setPhysicsLevel(user.physicsLevel);
    });
  }, [userProfile]);

  type StringFields =
    | "firstName"
    | "lastName"
    | "userName"
    | "email"
    | "gender"
    | "diagnos";
  type NumberFields = "age" | "weight" | "height" | "physicsLevel";

  const handleFieldChange = (
    field: StringFields | NumberFields,
    value: string
  ) => {
    if (
      field === "age" ||
      field === "weight" ||
      field === "height" ||
      field === "physicsLevel"
    ) {
      const numericValue = Number(value); // Konvertera till nummer
      switch (field) {
        case "age":
          setAge(numericValue);
          break;
        case "weight":
          setWeight(numericValue);
          break;
        case "height":
          setHeight(numericValue);
          break;
        case "physicsLevel":
          setPhysicsLevel(numericValue);
          break;
      }
    } else {
      switch (field) {
        case "firstName":
          setFirstName(value);
          break;
        case "lastName":
          setLastName(value);
          break;
        case "userName":
          setUserName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "gender":
          setGender(value);
          break;
        case "diagnos":
          setDiagnos(value);
          break;
      }
    }
  };

  const handleEditProfile = () => {
    dispatch({ type: ActionProfileType.TOGGLE, payload: true });
  };
  const handleSaveEdit = async () => {
    const userId = loggedInUser.userId;
    const token = getLocalStorage<string>("token");

    const userSettings = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
    };

    const profileSettings = {
      age,
      gender,
      weight,
      height,
      healthIssues: diagnos,
      physicsLevel,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const userRespone = await putData(
      `http://localhost:3000/api/users/update/${userId}`,
      userSettings,
      headers
    );
    console.log("user", userRespone);

    const profileRespone = await putData<IUserProfile, IResponse>(
      `http://localhost:3000/api/profile/update/${userId}`,
      profileSettings,
      headers
    );
    setMessage(profileRespone.message);

    dispatch({ type: ActionProfileType.TOGGLE, payload: false });
  };
  return (
    <>
      {!state && (
        <>
          <Wrapper direction="row" margintop={15} gap={50}>
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
              <Heading2 marginbottom={20}>
                Workout specified information
              </Heading2>
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
          </Wrapper>
          <Wrapper direction="row" margintop={6} gap={10}>
            {message === "" ? "" : message}
            <PrimaryButton onClick={handleEditProfile}>
              Edit Profile
            </PrimaryButton>
          </Wrapper>
        </>
      )}

      {state && (
        <>
          <Wrapper direction="row" margintop={15} gap={50}>
            <Wrapper
              backgroundColor="EEE7DA"
              direction="column"
              padding={30}
              margintop={1}
              gap={5}
            >
              <Heading2 marginbottom={20}>Personal information</Heading2>
              <Name
                value={firstName}
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
              ></Name>
              <Name
                value={lastName}
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
              ></Name>
              <Name
                value={userName}
                onChange={(e) => handleFieldChange("userName", e.target.value)}
              ></Name>
              <Email
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
              <Heading2 marginbottom={20}>
                Workout specified information
              </Heading2>

              <>
                <TextInput
                  placeholder="Age"
                  name="Age"
                  value={age !== 0 ? age : ""}
                  onChange={(e) => {
                    console.log("ändras");
                    handleFieldChange("age", e.target.value);
                  }}
                ></TextInput>
                <TextInput
                  placeholder="Gender"
                  name="Gender"
                  value={gender !== "" ? gender : ""}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                ></TextInput>
                <TextInput
                  placeholder="Weight in kg"
                  name="Weight"
                  value={weight !== 0 ? weight : ""}
                  onChange={(e) => handleFieldChange("weight", e.target.value)}
                ></TextInput>
                <TextInput
                  placeholder="Height in cm "
                  name="Height"
                  value={height !== 0 ? height : ""}
                  onChange={(e) => handleFieldChange("height", e.target.value)}
                ></TextInput>
                <TextInput
                  placeholder="Diagnos"
                  name="Diagnos"
                  value={diagnos !== "" ? diagnos : ""}
                  onChange={(e) => handleFieldChange("diagnos", e.target.value)}
                ></TextInput>
                <TextInput
                  placeholder="Physics level, 1-10"
                  name="PhysicsLevel"
                  value={physicsLevel !== 0 ? physicsLevel : ""}
                  onChange={(e) =>
                    handleFieldChange("physicsLevel", e.target.value)
                  }
                ></TextInput>
              </>
            </Wrapper>
          </Wrapper>
          <Wrapper direction="row" margintop={6} gap={10}>
            <PrimaryButton marginbottom={50} onClick={handleSaveEdit}>
              Save
            </PrimaryButton>
          </Wrapper>
        </>
      )}
    </>
  );
};
