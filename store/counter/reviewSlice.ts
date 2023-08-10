import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Review {
  id: number;
  user_id: number;
  link_avatar: string;
  user_name: string;
  text: string;
  created_at: string;
  grade: number;
  brand_id: number;
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState.review,
  reducers: {
    getReviews: (state, action: PayloadAction<Review[]>): void => {
      const {payload} = action;
      payload.map((review: Review) => {
        if (!state.find((r: Review) => r.id === review.id)) {
          state.push(review);
        }
      })
    },
    addReview: (state, action: PayloadAction<Review>): void => {
      state.push(action.payload);
    }
  }
});

export const {
  getReviews,
  addReview
} = reviewSlice.actions;