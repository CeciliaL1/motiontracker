import { useContext, useEffect, useState } from "react";
import { IResponse, IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { Wrapper } from "./styled/Wrappers";
import { ProfileContext } from "../context/ProfileContext";
import { PrimaryButton } from "./styled/styledButtons";
import { ActionProfileType } from "../reducers/profileReducer";
import { Email, Name, TextInput } from "./styled/styledInputs";
import { Heading2 } from "./styled/styledTextContent";
import { getData, postData, putData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { ErrorMessage } from "./styled/styledError";
import { PersonalInfo } from "./PersonalInfo";
import { StringFields, NumberFields } from "../models/FieldsType";

interface IUserProfileProps {
  userProfile: IUserProfile[];
  loggedInUser: IUserLogin;
  profileMessage: string;
}

export const UserProfile = ({
  userProfile,
  loggedInUser,
  profileMessage,
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
      const numericValue = Number(value);
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
      userId,
      age,
      gender,
      weight,
      height,
      healthIssues: diagnos,
      physicsLevel,
    };

    const getHeaders = {
      Authorization: `Bearer ${token}`,
    };

    const getProfile = await getData<IUserProfile>(
      `https://cecilial.hemsida.eu/api/profile/${userId}`,
      getHeaders
    );

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (Object.keys(getProfile).length === 0) {
      const response = await postData<IUserProfile, IResponse>(
        `https://cecilial.hemsida.eu/api/profile/add`,
        profileSettings,
        headers
      );
      console.log(response);
      dispatch({ type: ActionProfileType.TOGGLE, payload: false });
    } else {
      const userRespone = await putData(
        `https://cecilial.hemsida.eu/api/users/update/${userId}`,
        userSettings,
        headers
      );
      console.log("user", userRespone);

      const profileRespone = await putData<IUserProfile, IResponse>(
        `https://cecilial.hemsida.eu/api/profile/update/${userId}`,
        profileSettings,
        headers
      );
      setMessage(profileRespone.message);

      dispatch({ type: ActionProfileType.TOGGLE, payload: false });
    }
  };
  return (
    <>
      {!state && (
        <>
          <Wrapper direction="row" margintop={15} gap={50}>
            <PersonalInfo
              firstName={firstName}
              lastName={lastName}
              userName={userName}
              email={email}
              age={age}
              gender={gender}
              weight={weight}
              height={height}
              diagnos={diagnos}
              physicsLevel={physicsLevel}
            />
          </Wrapper>

          <Wrapper direction="row" margintop={6} gap={10}>
            {message === "" ? "" : message}
            <PrimaryButton
              aria-label="Edit profile"
              onClick={handleEditProfile}
            >
              Edit Profile
            </PrimaryButton>
            {profileMessage && (
              <ErrorMessage>
                <p>{profileMessage}</p>
              </ErrorMessage>
            )}
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
              <Heading2 marginbottom={20}>
                Workout specified information
              </Heading2>

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
                <TextInput
                  aria-label="Gender"
                  placeholder="Gender"
                  name="Gender"
                  value={gender !== "" ? gender : ""}
                  onChange={(e) => handleFieldChange("gender", e.target.value)}
                ></TextInput>
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
                <TextInput
                  aria-label="Diagnos"
                  placeholder="Diagnos"
                  name="Diagnos"
                  value={diagnos !== "" ? diagnos : ""}
                  onChange={(e) => handleFieldChange("diagnos", e.target.value)}
                ></TextInput>
                <TextInput
                  aria-label="Physics level, 1-10"
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
            <PrimaryButton
              aria-label="Save profile"
              marginbottom={50}
              onClick={handleSaveEdit}
            >
              Save
            </PrimaryButton>
          </Wrapper>
        </>
      )}
    </>
  );
};
