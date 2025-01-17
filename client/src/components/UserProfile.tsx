import { useContext, useEffect, useState } from "react";
import { IResponse, IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { Wrapper } from "./styled/Wrappers";
import { ProfileContext } from "../context/ProfileContext";
import { PrimaryButton } from "./styled/styledButtons";
import { ActionProfileType } from "../reducers/profileReducer";
import { getData, postData, putData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { ErrorMessage } from "./styled/styledError";
import { PersonalInfo } from "./PersonalInfo";
import { StringFields, NumberFields } from "../models/FieldsType";
import { EditUserProfile } from "./EditUserProfile";

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
          <Wrapper direction="row" margintop={15} gap={50}></Wrapper>
          <Wrapper direction="row" margintop={6} gap={10}>
            <EditUserProfile
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
              handleFieldChange={handleFieldChange}
            ></EditUserProfile>
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
