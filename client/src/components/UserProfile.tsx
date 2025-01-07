import { useContext } from "react";
import { IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { Wrapper } from "./styled/Wrappers";
import { ProfileContext } from "../context/ProfileContext";
import { PrimaryButton } from "./styled/styledButtons";
import { ActionProfileType } from "../reducers/profileReducer";

interface IUserProfileProps {
  userProfile: IUserProfile[];
  loggedInUser: IUserLogin;
}

export const UserProfile = ({
  userProfile,
  loggedInUser,
}: IUserProfileProps) => {
  console.log(userProfile);
  console.log(loggedInUser);
  const { state, dispatch } = useContext(ProfileContext);

  const handleEditProfile = () => {
    dispatch({ type: ActionProfileType.TOGGLE, payload: true });
  };
  const handleSaveEdit = () => {
    dispatch({ type: ActionProfileType.TOGGLE, payload: false });
  };
  return (
    <>
      {!state && (
        <Wrapper direction="row" margintop={15} gap={50}>
          <Wrapper direction="column" margintop={2} gap={5}>
            <p>{loggedInUser.firstName}</p>
            <p>{loggedInUser.email}</p>
          </Wrapper>
          <Wrapper direction="column" margintop={1} gap={5}>
            {userProfile.map((user) => (
              <>
                <p>{user.age}</p>
                <p>{user.gender}</p>
              </>
            ))}
          </Wrapper>
          <PrimaryButton onClick={handleEditProfile}>
            Edit Profile
          </PrimaryButton>
        </Wrapper>
      )}

      {state && (
        <Wrapper direction="row" margintop={15} gap={50}>
          <Wrapper direction="column" margintop={2} gap={5}>
            <input type="text" value={loggedInUser.firstName} />
            <input type="text" value={loggedInUser.email} />
          </Wrapper>
          <Wrapper direction="column" margintop={1} gap={5}>
            {userProfile.map((user) => (
              <>
                <p>{user.age}</p>
                <p>{user.gender}</p>
              </>
            ))}
          </Wrapper>
          <PrimaryButton onClick={handleSaveEdit}>Save</PrimaryButton>
        </Wrapper>
      )}
    </>
  );
};
