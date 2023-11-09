import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        messageStore: messageSlice,
        userStore: userSlice,
    },
});
