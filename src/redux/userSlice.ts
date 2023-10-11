import { createSlice } from "@reduxjs/toolkit";
import { userSliceType } from "../types/AuthTypes";

const initialState: userSliceType = {
  users: [],
  auth: "",
  token: "",
  loginMode: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authInfo: (state, action) => {
      state.auth = action.payload;
      console.log(state.auth);
    },
    tokenInfo: (state, action) => {
      state.token = action.payload;
      console.log(state.token);
    },
    loginModeToggle: (state) => {
      state.loginMode = !state.loginMode;
    },
  },
});

export const { authInfo, tokenInfo, loginModeToggle } = userSlice.actions;

export default userSlice.reducer;
