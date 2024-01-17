import {createStore, combineReducers, applyMiddleware} from 'redux';
import {loginReducer, sideMenuReducer} from './AuthReducers.js';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    login: loginReducer,
    sideMenu: sideMenuReducer,
    // Add more reducers if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;