import { useEffect, useState } from "react";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { getData } from "../services/serviceBase";
import { UserProfile } from "../components/UserProfile";

export const Profile = () => {
  const inloggedProfile = getLocalStorage<IUserLogin>("user");
  const { userId } = inloggedProfile;
  const token = getLocalStorage<string>("token");

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
        `http://localhost:3000/api/profile/${userId}`,
        headers
      );

      setUserData(response);
    };
    getUserData();
  }, [userId, token]);

  return (
    <>
      <UserProfile
        userProfile={userData}
        loggedInUser={inloggedProfile}
      ></UserProfile>
    </>
  );
};
