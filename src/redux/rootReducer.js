import { combineReducers } from "redux";
import Auth from '../modules/Auth/redux/reducer';
import AppStore from '../modules/Home/redux/reducer';

const rootReducer = combineReducers({
    Auth,
    AppStore
});

export default rootReducer;