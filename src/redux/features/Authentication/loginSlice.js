// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const token = Cookies.get("token");
let username;
let accountType;

let loggedIn;
if (token) {
  loggedIn = true;
  username = Cookies.get("username");
  accountType = Cookies.get("accountType");
} else {
  loggedIn = false;
  username = "";
}

const initialState = {
  username: username,
  password: "",
  loading: false,
  error: null,
  isLoggedIn: loggedIn,
  accountType: accountType,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setType(state, action) {
      state.accountType = action.payload;
    },
    resetLogin(state) {
      state.username = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
      state.accountType = "";
    },
  },
});

export const {
  setUsername,
  setPassword,
  setLoading,
  setError,
  setLoggedIn,
  isLoggedIn,
  resetLogin,
  setType,
} = loginSlice.actions;

export default loginSlice.reducer;
