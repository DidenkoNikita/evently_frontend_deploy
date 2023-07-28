import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export interface User {
  user: {
    id: number;
    phone: string;
    name: string;
    date_of_birth: string;
    gender: string;
    city: string;
    link_avatar: string
  };
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
}

export interface Data {
  user: User
}

export interface Avatar {
  link_avatar: string,
}

interface Categories {
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
}

export interface UpdatedCategories {
  userCategories: Categories;
}

interface Mood {
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
}

export interface UpdatedMood {
  userMood: Mood
}

interface City {
  city: string;
}

export interface UpdatedCity {
  userData: City
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    getUser: (state, action: PayloadAction<User>): User => {
      const {payload} = action;
      
      return state = {
          user: payload.user,
          userCategories: payload.userCategories,
          userMood: payload.userMood
        }
    },
    changeCategories: (state, action: PayloadAction<UpdatedCategories>): void => {
      const { payload } = action;
      state.userCategories = payload.userCategories
    },
    changeMood: (state, action: PayloadAction<UpdatedMood>) => {
      const { payload } = action;
      state.userMood = payload.userMood
    },
    changeCity: (state, action: PayloadAction<UpdatedCity>) => {
      const { payload } = action;
      state.user.city = payload.userData.city
    },
    updateAvatar: (state, action: PayloadAction<Avatar>): void => {
      const { payload } = action
      state.user.link_avatar = payload.link_avatar
    }
    
  }
});

export const {
  getUser,
  changeCategories,
  changeMood,
  changeCity
} = userSlice.actions;