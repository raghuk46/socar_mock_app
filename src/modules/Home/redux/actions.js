import { 
    FETCH_CAR_MODELS, 
    SAVE_CAR_MODELS,
    SAVE_USER_RESERVATION_FEED,
    UPDATE_USER_RESERVATION_FEED,
    REMOVE_USER_RESERVATION_FEED 
} from './actionTypes';

export const saveCarModelsData = data => ({
    type: SAVE_CAR_MODELS,
    payload: data
});

export const storeUserReservation = data => ({
    type: SAVE_USER_RESERVATION_FEED,
    payload: data
});