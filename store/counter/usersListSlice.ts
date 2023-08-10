import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export interface UsersList {
  id: number;
  phone: string;
  name: string;
  date_of_birth: string;
  gender: string;
  city: string;
  link_avatar: string;
  friends_id: number[];
  userCategories: {
    restaurants: boolean;
    trade_fairs: boolean;
    lectures: boolean;
    cafe: boolean;
    bars: boolean;
    sport: boolean;
    dancing: boolean;
    games: boolean;
    quests: boolean;
    concerts: boolean;
    parties: boolean;
    show: boolean;
    for_free: boolean;
    cinema: boolean;
    theaters: boolean;
  };
  userMood: {
    funny: boolean;
    sad: boolean;
    gambling: boolean;
    romantic: boolean;
    energetic: boolean;
    festive: boolean;
    calm: boolean;
    friendly: boolean;
    cognitive: boolean;
    dreamy: boolean;
    do_not_know: boolean;
  };
  phoneConfidentiality: {
    all: boolean;
    my_friends: boolean;
    nobody: boolean;
  };
  messageConfidentiality: {
    all: boolean;
    my_friends: boolean;
    nobody: boolean;
  };
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