export interface IUserProfile {
    profileId?: number;
    age: number;
    gender: string;
    weight: number;
    height: number;
    healthIssues: string;
    physicsLevel: number;
}

export interface IResponse {
    message: string;
}