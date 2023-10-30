import { createSlice } from "@reduxjs/toolkit";
import { Message, MessageData } from "../types/MessageTypes";

const initialState: MessageData = {
  messages: [],
  chatMode: false,
  chatID: "",
  chatKey: "",
  receiver: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const newMessage: Message = {
        id: state.messages.length + 1,
        content: action.payload.content,
        date: action.payload.date,
        hour: action.payload.hour,
      };
      state.messages.push(newMessage);
    },
    openChat: (state, action) => {
      state.chatMode = true;
      const chatID = action.payload;
      state.chatID = chatID[0];
      state.receiver = chatID[1];
      state.chatKey = chatID[2];
    },
  },
});

export const { newMessage, openChat } = messageSlice.actions;

export default messageSlice.reducer;
