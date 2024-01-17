import {createStore, combineReducers, applyMiddleware} from 'redux';
import {loginReducer} from './AuthReducers.js';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    login: loginReducer
    // Add more reducers if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;