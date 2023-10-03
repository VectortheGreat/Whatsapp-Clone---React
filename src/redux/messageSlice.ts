import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from "../types/MessageTypes";

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
      console.log(state.messages);
    },
  },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
