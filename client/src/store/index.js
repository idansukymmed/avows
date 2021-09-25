import { combineReducers } from 'redux';
import user from './red/user_reducer';
import product from './red/product_reducer';

const rootReducer = combineReducers({
    user,
    product
});

export default rootReducer;