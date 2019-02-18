import { AUTHENTICATE_USER, SAVE_USER_DETAILS, REMOVE_USER_DETAILS } from './actionTypes';

const initialState = {
    isAutorizedUser: false,
    userData: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE_USER:
            return { ...state, ...action.payload };
        case SAVE_USER_DETAILS: 
            return { ...state, ...action.payload }; 
        default:
            return state;  
    }
};