import { constants } from "./actionTypes";
import { AnyAction } from "redux";
import { IUser } from "./stateStructures";

//Initial state for each reducer
const loginInitialState = {
    isRegistering: false,
    registered: false,
    isLoggedIn: false,
    loggingIn: false,
    jwt: " " as any,
    user: {} as IUser,
};


//All Reducers

//Auth Reducer
export const authReducer = (
    state = loginInitialState,
    action: AnyAction
): typeof loginInitialState => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case constants.LOGIN_SUCCESS:
            console.log("in sucess reducer" + action.payload);
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                loggingIn: false,
            };
        case constants.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loggingIn: false,
            };
        case constants.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true,
            };
        case constants.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registered: true,
            };
        case constants.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
            };
        case constants.JWT_REQUEST:
            return {
                ...state,
                jwt: action.payload,
            };
        case constants.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                user: action.payload,
            };
        case constants.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                jwt: " "

            };
        default:
            return state;
    }
};

