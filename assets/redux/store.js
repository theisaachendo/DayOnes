// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import geoReducer from './reducers';

const store = configureStore({
    reducer: geoReducer,
});

export default store;
