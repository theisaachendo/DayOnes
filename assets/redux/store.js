// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import the combined rootReducer

const store = configureStore({
    reducer: rootReducer, // Use rootReducer with all reducers combined
});

export default store;
