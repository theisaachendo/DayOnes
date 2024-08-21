// redux/reducers.js
import { SET_GEOLOCATION_DATA, SET_USER_PROFILE } from './actions';  // Import the new action type

const initialState = {
    geolocationData: {
        timestamp: '',
        latitude: null,
        longitude: null,
        locale: '',
        geohash: ''
    },
    userProfile: null,  // Add userProfile to the initial state
};

const rootReducer = (state = initialState, action) => {  // Renamed to rootReducer for clarity
    switch (action.type) {
        case SET_GEOLOCATION_DATA:
            return { ...state, geolocationData: action.payload };
        case SET_USER_PROFILE:  // Handle the new action type
            return { ...state, userProfile: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
