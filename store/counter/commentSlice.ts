import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  link_avatar: string;
  name: string;
  text: string;
  like: number[];
  created_at: string;
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialState.comments,
  reducers: {
    getComments: (state, action: PayloadAction<Comment[]>): void => {
      const { payload } = action;
      payload.map((comment: Comment) => {
        if (!state.find((c: Comment) => c.id === comment.id)) {
          state.push(comment);
        }
      })
    },
    addComment: (state, action: PayloadAction<Comment>): void => {
      state.push(action.payload);
    },
    likeComment: (state, action: PayloadAction<Comment>): Comment[] => {
      const { payload } = action;
      return state.map((comment: Comment) => {
        if (comment.id === payload.id) {
          return payload;
        }
        return comment;
      }).sort((a, b) => a.id - b.id);
    },
  }
});

export const {
  getComments,
  addComment,
  likeComment
} = commentSlice.actions;