import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
            const newMessage = {
                id: state.messages.length + 1,
                content: action.payload.content,
                date: action.payload.date,
                hour: action.payload.hour,
            };
            state.messages.push(newMessage);
            console.log(state.messages[0]);
        },
        // @ts-ignore
        openChat: (state, action) => {
            // state.chatMode = true;
            // const chatID = action.payload;
            // //state.chatID = chatID[0];
            // state.receiver = chatID[1];
            // state.chatKey = chatID[2];
        },
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
export const { newMessage, openChat, newChatID } = messageSlice.actions;
export default messageSlice.reducer;
