import { createSlice } from "@reduxjs/toolkit";
import { userSliceType } from "../types/UserTypes";

const initialState: userSliceType = {
  users: [],
  auth: "",
  token: localStorage.getItem("user") || "",
  loginMode: true,
  toggleLoginOrSignup: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authInfo: (state, action) => {
      state.auth = action.payload;
    },
    tokenInfo: (state, action) => {
      state.token = action.payload; //eski
      const user = JSON.parse(action.payload);
      state.token = user;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(state.token);
    },
    loginModeToggle: (state) => {
      state.loginMode = !state.loginMode;
    },
    toggleLoginOrSignupReducer: (state) => {
      state.toggleLoginOrSignup = !state.toggleLoginOrSignup;
    },
  },
});

export const {
  authInfo,
  tokenInfo,
  loginModeToggle,
  toggleLoginOrSignupReducer,
} = userSlice.actions;

export default userSlice.reducer;
