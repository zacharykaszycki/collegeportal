import axios from "axios";
import { IUser, ILogIn } from "./stateStructures";

//Used for ease of exporting, these are the different functions in the file
export const service = {
    axiosLogin,
    // forgotPassword,
    // updateProfileImg,
    register,

    updateUser,

};

//Allowing use to send our credentials / cookies
const instance = axios.create({
    //withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
      }
  });


  //EXAMPLE OF A SERVICE REQUEST TO THE BACKEND
  async function axiosLogin(username:string, password:string) {
    const axiosResponse : any = await instance.post(url+'/login-service/signin', {
        "username": username,
        "password": password
    })
    console.log(axiosResponse.data);
    const axiosData : ILogIn = axiosResponse.data;
    return axiosData;
}

async function register(User: IUser) {
    const response = await instance.post(
        url+'/login-service/signup' ,
        {
            username: User.username,
            password: User.password,
            firstName: User.firstName,
            lastName: User.lastName,
            profilePicture: User.profilePicture,
            dateOfBirth: User.dateOfBirth,
            streetAddress: User.streetAddress,
            state: User.state,
            zipcode: User.zipcode

        }
    );
    const axiosData : any = response.data;
    // console.log(axiosData);
    if(axiosData.user.username != null) {
        return axiosData;
    }
    throw new Error("Unable to Create Account");
}


async function updateUser(user:IUser, varToken:string) {
/*     console.log("creatingpostiwht"+post.content);
    console.log("creatingpostiwht"+post.postImage);
    console.log("creatingpostiwht"+post.userId);
    console.log("creatingpostiwht"+post.postOwner); */

    const axiosResponse : any = await instance.post(url+'/user-service/update', {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        dateOfBirth: user.dateOfBirth,
        streetAddress: user.streetAddress,
        state: user.state,
        zipcode: user.zipcode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + varToken
      }})

    const axiosData : IUser = axiosResponse.data;
    // console.log(axiosData);
    return axiosData;
}

export const url:string = `http://localhost:9010`;
