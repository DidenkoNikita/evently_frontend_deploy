import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/reuestGet";
import { Comment, getComments } from "../counter/commentSlice";

export const getComment = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Comment[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data: Comment[] = await request('comments', 'GET');
    if (data !== null) {      
      dispatch(getComments(data));
    }
  } catch(e) {
    return console.log(e);
  }
}