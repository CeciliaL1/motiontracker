import { IUserProfile } from "../models/IUserProfile";
import { IUserLogin } from "../models/IUsers";
import { Wrapper } from "./styled/Wrappers";

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
  return (
    <>
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
      </Wrapper>
    </>
  );
};
