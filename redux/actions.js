// redux/actions.js
export const SET_GEOLOCATION_DATA = 'SET_GEOLOCATION_DATA';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';  // New action type

export const setGeolocationData = (geolocationData) => ({
    type: SET_GEOLOCATION_DATA,
    payload: geolocationData,
});

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    payload: userProfile,
});

export const setAccessToken = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token,
});

export const setUserID = (userID) => ({  // New action creator
    type: SET_USER_ID,
    payload: userID,
});
