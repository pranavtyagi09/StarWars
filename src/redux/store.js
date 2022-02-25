import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import starwarsReducer from './reducer/formSlice'

export const store = configureStore({
  reducer: {
    starwars: starwarsReducer,
  },
});
