// redux/reducers.js
import { SET_GEOLOCATION_DATA } from './actions';

const initialState = {
    geolocationData: {
        timestamp: '',
        latitude: null,
        longitude: null,
        locale: '',
        geohash: ''
    },
};

const geoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GEOLOCATION_DATA:
            return { ...state, geolocationData: action.payload };
        default:
            return state;
    }
};

export default geoReducer;
