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
      console.log(state.messages[0]);
    },
    // openChat: (state, action) => {
    //   // state.chatMode = true;
    //   // const chatID = action.payload;
    //   // //state.chatID = chatID[0];
    //   // state.receiver = chatID[1];
    //   // state.chatKey = chatID[2];
    // },
    newChatID: (state, action) => {
      state.chatMode = true;
      const chatID = action.payload;
      state.receiver = chatID[0];
      chatID.reverse();
      chatID.sort();
      // eslint-disable-next-line prefer-const
      let sortedArr = chatID.slice().reverse();
      state.chatID = `${sortedArr[0]}?${sortedArr[1]}`;
    },
  },
});

export const { newMessage, newChatID } = messageSlice.actions;

export default messageSlice.reducer;
