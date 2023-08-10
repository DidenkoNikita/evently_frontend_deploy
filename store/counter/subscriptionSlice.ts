import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Subscription {
  id: number;
  user_id: number;
  brand_id: number;
  link_photo: string;
  name: string;
  type: string;
}

export const subscriptionSLice = createSlice({
  name: 'subscriptionSlice',
  initialState: initialState.subscription,
  reducers: {
    subscriptionGet: (state, action: PayloadAction<Subscription[]>): void | Subscription[] => {
      const { payload } = action;

      if (payload.length === 0) {
        state = payload
        return state
      } else {
        payload.forEach((subscriprion: Subscription) => {
          const existingSubscription = state.find((s: Subscription) => s.id === subscriprion.id);
          
          if (!existingSubscription) {
            state.push(subscriprion);
          } else {
            const updatedState = state.map((s: Subscription) => (s.id === subscriprion.id ? subscriprion : s));
            state.splice(0, state.length, ...updatedState);
          }
        });
      }
    },
    addSubscription: (state, action: PayloadAction<Subscription>): void => {
      const { payload } = action;
      if (!state.find((subscriprion: Subscription) => subscriprion.id === payload.id)) {
        state.push(action.payload);
      }
    },
    deleteSubscription: (state, action: PayloadAction<Subscription>): Subscription[] => {
      const { payload } = action;
      
      state = state.filter((subscriprion: Subscription) => subscriprion.id !== payload.id);

      return state
    },
  }
});

export const {
  subscriptionGet,
  addSubscription,
  deleteSubscription
} = subscriptionSLice.actions;