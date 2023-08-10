import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Review, addReview } from "../counter/reviewSlice";

export const createReview = (text: string, grade: number, id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Review>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('create_review', {text, grade, brand_id: id}, 'POST');
    if (data !== null) {
      dispatch(addReview(data));
    }
  } catch(e) {
    return console.log(e);    
  }
} 