import {
    GET_PRODUCTS
} from '../types';

export default function productreducer(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                getProducts: action.payload
            }
        default:
            return state;
    }
}