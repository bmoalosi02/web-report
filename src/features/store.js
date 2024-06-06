import { configureStore } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  accessToken: null,
};

// Define reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.payload };
    case 'CLEAR_ACCESS_TOKEN':
      return { ...state, accessToken: null };
    default:
      return state;
  }
};

// Create store using configureStore
export const store = configureStore({
  reducer: rootReducer,
});
