export interface IUserLogin {
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
 user: IUserLogin;
 token: string;
 refreshToken: string;
 message?: string;
}


export interface IUserSignUp {
    firstName: string;
    lastName: string;
    userEmail: string;
    userName: string;
    userPassword: string;
}