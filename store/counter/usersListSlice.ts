import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export interface UsersList {
  id: number;
  name: string;
  link_avatar: string;
  phone: string;
}

export const usersListSlice = createSlice({
  name: 'user',
  initialState: initialState.usersList,
  reducers: {
    getListUsers: (state, action: PayloadAction<UsersList[]>): void => {
      const { payload } = action;
      payload.forEach((user) => {
        if (!state.find((u) => u.id === user.id)) {
          state.push(user);
        }
      })
    }
  }
});

export const {
  getListUsers
} = usersListSlice.actions;