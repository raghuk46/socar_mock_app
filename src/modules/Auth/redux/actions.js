import { AUTHENTICATE_USER, SAVE_USER_DETAILS, REMOVE_USER_DETAILS } from './actionTypes';

export const authenticateUser = data => ({
    type: AUTHENTICATE_USER,
    payload: data
});

export const saveUserDetails = data => ({
    type: SAVE_USER_DETAILS,
    payload: data
}); 