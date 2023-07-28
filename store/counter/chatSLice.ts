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
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState.chats,
  reducers: {
    chatsGet: (state, action: PayloadAction<IChat[]>): void => {
      const { payload } = action;
      console.log(payload);
    
      payload.forEach((chat: IChat) => {
        if (!state.some((c: IChat) => c.id === chat.id)) {
          console.log(chat);
          state.push(chat);
        }
      })
    },
    addChat: (state, action: PayloadAction<IChat>): void => {
      const { payload } = action;
      if (!state.find((chat: IChat) => chat.id === payload.id)) {
        state.push(action.payload);
      }
    },
  }
});

export const {
  chatsGet,
  addChat
} = chatSlice.actions;