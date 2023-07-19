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

interface Avatar {
  link_avatar: string,
  id: number
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    getUser: (state, action: PayloadAction<User[]>): void => {
      const {payload} = action;
      console.log(payload);
      
      payload.map((user: User) => {
        if (!state.find((p: User) => p.user.id === user.user.id)) {
          state.push(user);
          state.sort((a, b) => a.user.id - b.user.id)
        }
      })
    },
    changeCategories: (state, action: PayloadAction<Data>): User[] => {
      const { payload } = action;
      const updatedState = state.map((user) => {
        if (user.user.id === payload.user.user.id) {
          const userObj = user.user;
          const mood = user.userMood;
          console.log(userObj, mood);
          
          const obj = {
            user: userObj,
            userCategories: payload.user.userCategories,
            userMood: mood
          }          
          return obj
        }
        return user;
      });      
      return updatedState;
    },
    changeMood: (state, action: PayloadAction<Data>): User[] => {
      const { payload } = action;
      const updatedState = state.map((user) => {
        if (user.user.id === payload.user.user.id) {
          const userObj = user.user;
          const categories = user.userCategories;
          console.log(userObj, categories);
          
          const obj = {
            user: userObj,
            userCategories: categories,
            userMood: payload.user.userMood
          }          
          return obj
        }
        return user;
      });      
      return updatedState;
    },
    changeCity: (state, action: PayloadAction<Data>): User[] => {
      const { payload } = action;
      const { user } = payload;
    
      const updatedState = state.map((userData) => {
        if (userData.user.id === user.user.id) {
          return {
            ...userData,
            user: {
              ...userData.user,
              city: user.user.city,
            },
          };
        }
        return userData;
      });
    
      return updatedState;
    },
    updateAvatar: (state, action: PayloadAction<Avatar>): void => {
      const { payload } = action
      state.map((user) => {
        if (user.user.id = payload.id) {
          user.user.link_avatar = payload.link_avatar
        }
      })
    }
    
  }
});

export const {
  getUser,
  changeCategories,
  changeMood,
  changeCity
} = userSlice.actions;