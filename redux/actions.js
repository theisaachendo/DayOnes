// redux/actions.js
export const SET_GEOLOCATION_DATA = 'SET_GEOLOCATION_DATA';

export const setGeolocationData = (geolocationData) => ({
    type: SET_GEOLOCATION_DATA,
    payload: geolocationData,
});
