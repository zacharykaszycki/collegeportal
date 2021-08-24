
//SUPPORTING STATE MODELS
export interface IUser{
    userId?: number;
    username: string;
    firstName: string;
    lastName: string;
    password?: string;
    dateOfBirth: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    profilePicture: string;
}

export interface ILogIn{
    user : IUser | null,
    jwtToken: String | null
}
