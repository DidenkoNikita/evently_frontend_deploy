import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface IMessage {
  id: number;
  user_id: number;
  created_at: string;
  text: string;
  chat_id: number;
  is_read: boolean;
  post_id: number | null;
}

export const messageSlice = createSlice({
  name: 'message',
  initialState: initialState.messages,
  reducers: {
    messagesGet: (state, action: PayloadAction<IMessage[]>): void => {
      const { payload } = action;
      payload.forEach((message: IMessage) => {
        if (!state.find((m: IMessage) => m.id === message.id) && message.created_at !== undefined) {
          state.push(message);
          state.sort((message1, message2) => message1.id - message2.id)
        }
      })
    },
    addMessage: (state, action: PayloadAction<IMessage>): void => {
      const { payload } = action;
      if (!state.find((message: IMessage) => message.id === payload.id)) {
        state.push(action.payload);
      }
    },
    markMessageAsRead(state, action: PayloadAction<IMessage>) {
      const messageId = action.payload;
      const message = state.find((message) => message.id === messageId.id);
      if (message) {
        message.is_read = true;
      }
      state.sort((message1, message2) => message1.id - message2.id)
    },
  }
});

export const {
  messagesGet,
  addMessage,
  markMessageAsRead
} = messageSlice.actions;