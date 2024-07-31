import { configureStore } from "@reduxjs/toolkit";
import ChatReducer from "./chatSlice"
// state management, don't need to create a lot of states in many files
const store = configureStore({
    reducer: {
        chat: ChatReducer
    },
});

export default store;