import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

const enhancers = [];
let middleware = [thunk];

if(__DEV__){
    middleware = [...middleware, createLogger({ diff: true, collapsed: true })];
} else middleware = [...middleware];

export default(configureStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
});