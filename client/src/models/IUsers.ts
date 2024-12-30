export interface IUser {
    userId: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}
export interface ILoginUser {
    userEmail: string;
    userPassword: string;

}
export interface ILoggedIn {
 user: IUser;
 token: string;
 refreshToken: string;
 message?: string;
    

}