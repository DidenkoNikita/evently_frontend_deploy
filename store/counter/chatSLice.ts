import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface IChat {
  id: number;
  link_avatar: string;
  name: string;
  users_id: number[];
  userId: number;
  isReadMessage: boolean;
  textMessage: string;
  timeMessage: string;
  unreadMessages: number;
}

export interface Chat {
  id: number;
  users_id: number[];
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState.chats,
  reducers: {
    chatsGet: (state, action: PayloadAction<IChat[]>): void | IChat[] => {
      const { payload } = action;
      console.log(payload);

      if (payload.length === 0) {
        state = payload
        return state
      } else {
        payload.forEach((chat: IChat) => {
          const existingChat = state.find((c: IChat) => c.id === chat.id);
          console.log(existingChat);
          
          if (!existingChat) {
            console.log(chat);
            state.push(chat);
          } else {
            const updatedState = state.map((c: IChat) => (c.id === chat.id ? chat : c));
            state.splice(0, state.length, ...updatedState);
            console.log(state);
          }
        });
      }
 
    },
    addChat: (state, action: PayloadAction<IChat>): void => {
      const { payload } = action;
      if (!state.find((chat: IChat) => chat.id === payload.id)) {
        state.push(action.payload);
      }
    },
    updateChat: (state, action: PayloadAction<IChat[]>): void => {
      const { payload } = action;
      console.log(payload);
      const [chatPayload] = payload;
      console.log(chatPayload);
      
      const updatedState = state.map((chat: IChat) => {
        if (chat.id === chatPayload.id) {
          return chatPayload;
        }
        return chat;
      });

      state.splice(0, state.length, ...updatedState);
    },

    removeChat: (state, action: PayloadAction<IChat>): IChat[] =>  {
      const { payload } = action;
      // Возвращаем новый массив, удаляя из него чат с указанным id
      state = state.filter((chat) => chat.id !== payload.id);
      
      return state
    },
  }
});

export const {
  chatsGet,
  addChat,
  updateChat,
  removeChat
} = chatSlice.actions;