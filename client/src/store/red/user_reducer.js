import {
    AUTH_USER,
    VERIFY_PHONE,
    CONFIRM_PHONE_NUMBER,
    FIRST_UPDATE,
    LOGOUT_USER,
    // GET_USERS,
    // GET_USERS_BY_ID
} from '../types';

export default function userreducer(state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case VERIFY_PHONE:
            return {
                ...state,
                verifySuccess: action.payload
            }
        case CONFIRM_PHONE_NUMBER:
            return {
                ...state,
                confirmSuccess: action.payload
            }
        case FIRST_UPDATE:
            return {
                ...state,
                firstSuccess: action.payload
            }
        case LOGOUT_USER:
            return { ...state }
        // case GET_USERS:
        //     return {
        //         ...state,
        //         getUser: action.payload
        //     }
        // case GET_USERS_BY_ID:
        //     return {
        //         ...state,
        //         getUserByid: action.payload
        //     }
        default:
            return state;
    }
}