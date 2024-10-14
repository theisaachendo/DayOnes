// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './reducers';
import accessTokenReducer from './reducers'

const store = configureStore({
    reducer: geoReducer,
    reducer: accessTokenReducer,
});

export default store;
