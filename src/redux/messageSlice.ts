import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from "../types/MessageTypes";

const initialState:MessageState = {
  message: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.message = [...state.message, action.payload];
      console.log(state.message);
    },
  },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
