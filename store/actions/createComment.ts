import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { Comment, addComment } from "../counter/commentSlice";

export const createComment = (text: string, id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Comment>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('comments', { text, post_id: id }, 'POST');
    if (data !== null) {
      dispatch(addComment(data))
    }
  } catch (e) {
    return console.log(e);
  }
} 