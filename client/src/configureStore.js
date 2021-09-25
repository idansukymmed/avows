import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware  from 'redux-thunk';

import monitorReducersEnhancer from './monredu';
import rootReducer from './store';

import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';

export default function configureStore(preloadedState){
    const middlewares = [promiseMiddleware, logger, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
    const composedEnhancers = compose(...enhancers)

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancers
        // applyMiddleware(promiseMiddleware, thunkMiddleware, logger)
    );

    return store
}