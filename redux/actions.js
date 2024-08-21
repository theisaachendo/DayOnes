// redux/actions.js
export const SET_GEOLOCATION_DATA = 'SET_GEOLOCATION_DATA';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';  // New action type

export const setGeolocationData = (geolocationData) => ({
    type: SET_GEOLOCATION_DATA,
    payload: geolocationData,
});

export const setUserProfile = (userProfile) => ({  // New action creator
    type: SET_USER_PROFILE,
    payload: userProfile,
});
