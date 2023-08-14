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
    link_avatar: string;
    friends_id: number[];
    color_theme: boolean;
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

export interface Data {
  user: User
}

interface PhoneConfidentiality {
  all: boolean;
  my_friends: boolean;
  nobody: boolean;
};

export interface UpdatePhoneConfidentiality {
  data: PhoneConfidentiality;
}

interface MessageConfidentiality {
  all: boolean;
  my_friends: boolean;
  nobody: boolean;
};

export interface UpdateMessageConfidentiality {
  data: MessageConfidentiality;
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

interface Theme {
  color_theme: boolean;
}

export interface ChangeTheme {
  userData: Theme;
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
          userMood: payload.userMood,
          phoneConfidentiality: payload.phoneConfidentiality,
          messageConfidentiality: payload.messageConfidentiality
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
    },
    updatePhoneConfidetiality: (state, action: PayloadAction<UpdatePhoneConfidentiality>): void => {
      const { payload } = action
      state.phoneConfidentiality === payload.data
    },
    updateMessagesConfidetiality: (state, action: PayloadAction<UpdateMessageConfidentiality>): void => {
      const { payload } = action
      state.messageConfidentiality === payload.data
    },
    changeTheme: (state, action: PayloadAction<ChangeTheme>) => {
      const { payload } = action;
      state.user.color_theme = payload.userData.color_theme
    },
  }
});

export const {
  getUser,
  changeCategories,
  changeMood,
  changeCity,
  updateAvatar,
  updateMessagesConfidetiality,
  updatePhoneConfidetiality,
  changeTheme
} = userSlice.actions;