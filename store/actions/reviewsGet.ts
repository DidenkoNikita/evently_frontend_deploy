import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Review, getReviews } from "../counter/reviewSlice";
import { request } from "@/requests/request";

export const reviewGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Review[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('get_review', {}, 'POST');
    if (data !== null) {      
      dispatch(getReviews(data));
    }
  } catch(e) {
    return console.log(e);
  }
}