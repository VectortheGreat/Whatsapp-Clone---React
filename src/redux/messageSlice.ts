import { createSlice } from "@reduxjs/toolkit";
import { Message, MessageData } from "../types/MessageTypes";

const initialState: MessageData = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const newMessage: Message = {
        id: state.messages.length + 1, // Mesaj ID'sini otomatik olarak artırabilirsiniz.
        content: action.payload.content,
        date: action.payload.date,
        hour: action.payload.hour,
      };
      state.messages.push(newMessage);
    },
  },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
