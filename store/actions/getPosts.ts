import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { Post, getPosts } from "../counter/postsSlice";
import { request } from "@/requests/reuestGet";

export const getPost = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Post[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('posts', 'GET');
    if (data !== null) {
      dispatch(getPosts(data.post));
    }
  } catch (e) {
    return console.log(e);
  }
}