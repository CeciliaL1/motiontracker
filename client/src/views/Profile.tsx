import { useEffect, useReducer, useState } from "react";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { getData } from "../services/serviceBase";
import { UserProfile } from "../components/UserProfile";
import { ProfileContext } from "../context/ProfileContext";
import { ProfileReducer } from "../reducers/profileReducer";

export const Profile = () => {
  const [state, dispatch] = useReducer(ProfileReducer, false);
  const inloggedProfile = getLocalStorage<IUserLogin>("user");
  const { userId } = inloggedProfile;
  const token = getLocalStorage<string>("token");

  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState<IUserProfile[]>([
    {
      profileId: 0,
      age: 0,
      gender: "",
      weight: 0,
      height: 0,
      healthIssues: "",
      physicsLevel: 0,
    },
  ]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const getUserData = async () => {
      const response = await getData<IUserProfile[]>(
        `https://cecilial.hemsida.eu/api/profile/${userId}`,
        headers
      );
      if (response.length === 0) {
        setMessage(
          "You´ll need to edit your profile and insert values to be able to generate a workout"
        );
      }
      setUserData(response);
    };
    getUserData();
  }, [userId, token]);

  return (
    <>
      <ProfileContext.Provider value={{ state, dispatch }}>
        <UserProfile
          profileMessage={message}
          userProfile={userData}
          loggedInUser={inloggedProfile}
        ></UserProfile>
      </ProfileContext.Provider>
    </>
  );
};
