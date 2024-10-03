import { combineReducers } from 'redux';
import {
    SET_GEOLOCATION_DATA,
    SET_USER_PROFILE,
    SET_ACCESS_TOKEN,
    SET_USER_ID,
    SET_SIGNATURE_COLOR,
    SET_SIGNATURE_SIZE  // Import the new action type
} from './actions';

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
    signatureColor: '#FF0000', // Default color for signature
    signatureSize: { width: 450, height: 450 }, // Default size for signature
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

const userIDReducer = (state = initialState.userID, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return action.payload;
        default:
            return state;
    }
};

const signatureColorReducer = (state = initialState.signatureColor, action) => {
    switch (action.type) {
        case SET_SIGNATURE_COLOR:
            return action.payload;
        default:
            return state;
    }
};

const signatureSizeReducer = (state = initialState.signatureSize, action) => { // New reducer for signature size
    switch (action.type) {
        case SET_SIGNATURE_SIZE:
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
    userID: userIDReducer,
    signatureColor: signatureColorReducer,
    signatureSize: signatureSizeReducer, // Include signatureSize in the root reducer
});

export default rootReducer;
