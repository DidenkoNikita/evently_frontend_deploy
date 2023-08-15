import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { Post, likePost } from "../counter/postsSlice";

export const likePosts = (post_id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Post>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('posts', { post_id }, 'POST');

    if (data !== null) {
      dispatch(likePost(data));
    }
  } catch (e) {
    return console.log(e);
  }
}