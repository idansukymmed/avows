import axios from 'axios';
import {
    AUTH_USER,
    VERIFY_PHONE,
    CONFIRM_PHONE_NUMBER,
    FIRST_UPDATE,
    LOGOUT_USER,
    // GET_USERS,
    // GET_USERS_BY_ID
} from '../types';
import { USER_SERVER } from '../misc';

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function verifyPhone(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/verifyphone`, dataToSubmit)
        .then(response => response.data);

    return {
        type: VERIFY_PHONE,
        payload: request
    }
}

export function confirmPin(dataToSubmit, token, requestid) {
    const request = axios.post(`${USER_SERVER}/confirmpin?token=${token}&requestid=${requestid}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: CONFIRM_PHONE_NUMBER,
        payload: request
    }
}

export function firstUpdate(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/firstupdate`, dataToSubmit)
        .then(response => response.data);

    return {
        type: FIRST_UPDATE,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// export function getAdminUser() {
//     const request = axios.get(`${USER_SERVER}/adminusers`)
//         .then(response => response.data);

//     return {
//         type: GET_USERS,
//         payload: request
//     }
// }

// export function getAdminUserByid(id) {
//     const request = axios.get(`${USER_SERVER}/adminusersbyid?id=${id}&type=single`)
//         .then(response => response.data);

//     return {
//         type: GET_USERS_BY_ID,
//         payload: request
//     }
// }