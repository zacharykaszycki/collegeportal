import { constants } from "./actionTypes";
import { service } from "./service";
import { AppDispatch } from "./store";
import { IUser, } from "./stateStructures";

//Actions are what you dispatch from your components, this file contains all the actions you can dispatched

export const userLogin = (username: string, password: string) => async (
    dispatch: AppDispatch
) => {
    try {
        //dispatch action types corresponding to what is happening in your application to update the redux store
        console.log("Before Log in request")
        dispatch({ type: constants.LOGIN_REQUEST });
        const res = await service.axiosLogin(username, password); //Use the service to make requests to the database
        console.log("After Request Log in request")
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res.user, //param/action.payload to the reducer
        });
        dispatch({
            type: constants.JWT_REQUEST,
            payload: res.jwtToken, //param/action.payload to the reducer
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.LOGIN_FAILURE,
            payload: [], //param/action.payload to the reducer
        });
    }
};

export const registerAccount = (User: IUser) => async (
    dispatch: AppDispatch
) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.REGISTER_REQUEST });
        const res = await service.register(User);
        dispatch({ type: constants.REGISTER_SUCCESS });
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res.user,
        });
        dispatch({
            type: constants.JWT_REQUEST,
            payload: res.jwtToken, //param/action.payload to the reducer
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.REGISTER_FAILURE,
        });
    }
};

export const updateUser = (user: IUser, jwt: string) => async (
    dispatch: AppDispatch
) => {
    try {
        const res = await service.updateUser(user, jwt);
        dispatch({
            type: constants.UPDATE_PROFILE_REQUEST,
            payload: res,
        });
    
    } catch (e) {
        console.log(e);
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: constants.LOGOUT,
    });
};
