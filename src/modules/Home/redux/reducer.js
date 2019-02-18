import { 
    FETCH_CAR_MODELS, 
    SAVE_CAR_MODELS,
    SAVE_USER_RESERVATION_FEED,
    UPDATE_USER_RESERVATION_FEED,
    REMOVE_USER_RESERVATION_FEED
} from './actionTypes';

const initalState = {
    carModels: [],
    reservations: []
};

export default (state= initalState, action) => {
    switch(action.type) {
        case FETCH_CAR_MODELS:
            return { ...state, ...action.payload };
        case SAVE_CAR_MODELS:
            return { ...state, carModels: [ ...action.payload.data ]};
        case SAVE_USER_RESERVATION_FEED:
            return { ...state, reservations: [{ ...action.payload }]};    
        default:
            return state;        
    }
};