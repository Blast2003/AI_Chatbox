import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { marked, Marked } from "marked";
import DOMPurify from 'dompurify';

const initData = {
    data:[],
}

/*

data:[
    { // object = 1 box chat
        id: 1,
        title: 'qweqweqw,
        messages: [
            {id: 1, text: 'react là gì', isBot: false}, => user ask
            {id: 2, text: 'react là lib của js', isBot: true}, => AI answer
        ]
        
    }
]

*/

const ChatSlide = createSlice({
    name: 'chat',
    initialState: initData,
    reducers:{
        addChat: (state, action) => { 

            state.data.push({
                id: uuidv4(),
                title: 'Chat',
                messages: [],
            })
        },
        addMsg: (state, action) => { 
            const {idChat, userMessage, botMessage} = action.payload;
            const chat = state.data.find((chat) => chat.id === idChat)  // chat = state.data
            if(chat){
                
                const msgFormat = marked.parse(botMessage)
                const safeChat = DOMPurify.sanitize(msgFormat) 

                const newMessage =[
                    ...chat.messages,
                    {id:uuidv4(), text: userMessage, isBot: false},
                    {id:uuidv4(), text: safeChat, isBot: true}
                ]

                chat.messages = newMessage
            }
        },
        RemoveChat: (state, action) => {
            // chat.id always === action.payload => state.data = []
            state.data = state.data.filter((chat) => chat.id !== action.payload) 
        },
        setNameChat: (state, action) =>{
            const {newTitle, chatId} = action.payload;
            const chat = state.data.find((chat) => chat.id === chatId)
            if(chat){
                chat.title = newTitle;
            }
        }

    }
})

export const {addChat, RemoveChat, addMsg, setNameChat } = ChatSlide.actions;

export default ChatSlide.reducer;   
