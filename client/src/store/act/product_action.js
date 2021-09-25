import axios from 'axios';
import {
    GET_PRODUCTS
} from '../types';
import { PRODUCT_SERVER } from '../misc';

export function getProducts(dataToSubmit = {}, filters = []) {

    const data = {
        filters
    }

    const min = dataToSubmit.min ? dataToSubmit.min : undefined;
    const max = dataToSubmit.max ? dataToSubmit.max : undefined;

    const request = axios.get(`${PRODUCT_SERVER}/getproducts?min=${min}&max=${max}`, data)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS,
        payload: request
    }
}