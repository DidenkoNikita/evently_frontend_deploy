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
  updated_at: Date;
  postId: number;
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

      if (payload.length === 0) {
        state = payload
        return state
      } else {
        payload.forEach((chat: IChat) => {
          const existingChat = state.find((c: IChat) => c.id === chat.id);
          
          if (!existingChat) {
            state.push(chat);
          } else {
            const updatedState = state.map((c: IChat) => (c.id === chat.id ? chat : c));
            state.splice(0, state.length, ...updatedState);
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
      const [chatPayload] = payload;

      const updatedState = state.map((chat: IChat) => {
        if (chat.id === chatPayload.id) {
          return chatPayload;
        }
        return chat;
      });

      state.splice(0, state.length, ...updatedState);
    },

    removeChat: (state, action: PayloadAction<IChat>): IChat[] => {
      const { payload } = action;
      
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