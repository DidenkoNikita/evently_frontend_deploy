import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Notification {
  id: number;
  creator_id: number;
  user_id: number;
  link_avatar: string;
  name: string;
}

export interface Data {
  id: number;
  creator_id: number;
  user_id: number;
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState.notifications,
  reducers: {
    getNotifications: (state, action: PayloadAction<Notification[]>): void => {
      const { payload } = action;
      payload.map((notification: Notification) => {
        if (!state.find((n) => n.id === notification.id)) {
          state.push(notification);
        }
      });
    },
    deleteNotification: (state, action: PayloadAction<Data>): Notification[] => {
      const { payload } = action;
      console.log('payload', payload);
      
      state = state.filter((notification) => notification.id !== payload.id);
      return state
    }
  }
});

export const {
  getNotifications,
  deleteNotification
} = notificationSlice.actions;