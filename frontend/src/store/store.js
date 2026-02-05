import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import roleReducer from "./rolesSlice";
import garageReducer from "./garageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    roles: roleReducer,
    garages: garageReducer
  },
});
