import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Post {
  id: number;
  link_photo: string;
  link_avatar: string;
  user_name: string;
  title: string;
  like: number[];
  type: string;
  brand_id: number;
}

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState.posts,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>): void => {
      const { payload } = action;
      payload.map((post: Post) => {
        if (!state.find((p: Post) => p.id === post.id)) {
          state.push(post);
          state.sort((a, b) => a.id - b.id)
        }
      })
    },
    likePost: (state, action: PayloadAction<Post>): Post[] => {
      const { payload } = action;
      return state.map((post: Post) => {
        if (post.id === payload.id) {
          return payload;
        }
        return post;
      })
    },
  }
});

export const {
  getPosts,
  likePost
} = postSlice.actions;