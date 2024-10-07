import { combineReducers } from 'redux';
import {
    SET_GEOLOCATION_DATA,
    SET_USER_PROFILE,
    SET_ACCESS_TOKEN,
    SET_USER_ID,
    SET_SIGNATURE_COLOR,
    SET_SIGNATURE_SIZE,
    SET_FCM_TOKEN, // Import FCM token action type
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
    signatureColor: '', // Default color for signature
    signatureSize: '',
    token: null, // Add token to the initial state for FCM
};

// Geolocation Reducer
const geoReducer = (state = initialState.geolocationData, action) => {
    switch (action.type) {
        case SET_GEOLOCATION_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

// User Profile Reducer
const userProfileReducer = (state = initialState.userProfile, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return action.payload;
        default:
            return state;
    }
};

// Access Token Reducer
const accessTokenReducer = (state = initialState.accessToken, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

// User ID Reducer
const userIDReducer = (state = initialState.userID, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return action.payload;
        default:
            return state;
    }
};

// Signature Color Reducer
const signatureColorReducer = (state = initialState.signatureColor, action) => {
    switch (action.type) {
        case SET_SIGNATURE_COLOR:
            return action.payload;
        default:
            return state;
    }
};

// Signature Size Reducer
const signatureSizeReducer = (state = initialState.signatureSize, action) => {
    switch (action.type) {
        case SET_SIGNATURE_SIZE:
            return action.payload;
        default:
            return state;
    }
};

// FCM Token Reducer (new reducer to handle FCM token)
const fcmTokenReducer = (state = initialState.token, action) => {
    switch (action.type) {
        case SET_FCM_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    geolocationData: geoReducer,
    userProfile: userProfileReducer,
    accessToken: accessTokenReducer,
    userID: userIDReducer,
    signatureColor: signatureColorReducer,
    signatureSize: signatureSizeReducer,
    token: fcmTokenReducer, // Include FCM token reducer in the root reducer
});

export default rootReducer;
