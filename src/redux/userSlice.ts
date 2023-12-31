import { createSlice } from "@reduxjs/toolkit";
import { userSliceType } from "../types/UserTypes";

const storedUser = localStorage.getItem("user");
const initialState: userSliceType = {
  users: [],
  loggedUser: storedUser ? JSON.parse(storedUser) : null,
  auth: "",
  token: localStorage.getItem("user") || "",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  loginMode: null,
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
      if (localStorage.getItem("user")) {
        state.token = "";
      } else {
        localStorage.setItem("user", action.payload);
        const logedUserParse = localStorage.getItem("user");
        state.loggedUser = JSON.parse(logedUserParse!);
        console.log(state.loggedUser);
      }
    },
    loginModeToggle: (state, action) => {
      state.loginMode = action.payload;
    },
    toggleLoginOrSignupReducer: (state) => {
      state.toggleLoginOrSignup = !state.toggleLoginOrSignup;
    },
    fetchUsersFromDB: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  authInfo,
  tokenInfo,
  loginModeToggle,
  toggleLoginOrSignupReducer,
  fetchUsersFromDB,
} = userSlice.actions;

export default userSlice.reducer;
