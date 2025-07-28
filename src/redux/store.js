import userReducer from "./userSlice";
import modalReducer from "./modelSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});
