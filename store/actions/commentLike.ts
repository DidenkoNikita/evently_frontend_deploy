import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { Comment } from "../counter/commentSlice";
import { likeComment } from "../counter/commentSlice";

export const commentLike = (comment_id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Comment>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('comments', { comment_id }, 'PUT');

    if (data !== null) {
      dispatch(likeComment(data));
    }
  } catch (e) {
    return console.log(e);
  }
};
