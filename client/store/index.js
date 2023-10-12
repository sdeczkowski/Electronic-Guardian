import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import Reducers from "./reducers";

const RootReducers = combineReducers({
  Reducers,
});

export const store = configureStore({reducer: RootReducers});