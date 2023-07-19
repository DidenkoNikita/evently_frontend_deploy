import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { likeComment } from "../counter/commentSlice";
import { Comment } from "../counter/commentSlice";

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
