import { createStore, combineReducers } from 'redux';
import { profileReducer } from './reducers/profileReducer'; // Import your profileReducer

// Combine your reducers (in this case, just profileReducer for now)
const rootReducer = combineReducers({
  profile: profileReducer,
  // Add more reducers here as your app grows
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
