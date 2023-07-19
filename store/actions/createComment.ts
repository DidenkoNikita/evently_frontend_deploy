import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Comment, addComment } from "../counter/commentSlice";
import { request } from "@/requests/request";

export const createComment = (text: string, id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Comment>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('comments', {text, post_id: id}, 'POST');
    if (data !== null) {
      dispatch(addComment(data))
    }
  } catch(e) {
    return console.log(e);    
  }
} 