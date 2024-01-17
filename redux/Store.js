import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './AuthReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    // Add more reducers if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;