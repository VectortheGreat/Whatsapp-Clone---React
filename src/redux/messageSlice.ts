import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from "../types/MessageTypes";

const initialState: MessageState = {
  messages: [],
  dates: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
      console.log(state.messages)
    },
    newMessageDate: (state, action) => {
      state.dates = [...state.dates, action.payload];
    },
  },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
