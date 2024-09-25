import { combineReducers } from 'redux';
import { SET_GEOLOCATION_DATA, SET_USER_PROFILE, SET_ACCESS_TOKEN, SET_USER_ID } from './actions';

const initialState = {
    geolocationData: {
        timestamp: '',
        latitude: null,
        longitude: null,
        locale: '',
        geohash: ''
    },
    userProfile: null,
    accessToken: '',
    userID: '', // Add userID to the initial state
};

const geoReducer = (state = initialState.geolocationData, action) => {
    switch (action.type) {
        case SET_GEOLOCATION_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const userProfileReducer = (state = initialState.userProfile, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return action.payload;
        default:
            return state;
    }
};

const accessTokenReducer = (state = initialState.accessToken, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

const userIDReducer = (state = initialState.userID, action) => { // New reducer
    switch (action.type) {
        case SET_USER_ID:
            return action.payload;
        default:
            return state;
    }
};

// Combine reducers into one root reducer
const rootReducer = combineReducers({
    geolocationData: geoReducer,
    userProfile: userProfileReducer,
    accessToken: accessTokenReducer,
    userID: userIDReducer, // Include userID in the root reducer
});

export default rootReducer;
