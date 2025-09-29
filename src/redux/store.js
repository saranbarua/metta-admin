import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/Authentication/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  devTools: false,
});
