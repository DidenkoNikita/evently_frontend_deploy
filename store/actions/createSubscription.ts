import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Subscription, addSubscription } from "../counter/subscriptionSlice";

export const createSubscription = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Subscription>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('create_subscription', {brand_id: id}, 'POST');
    if (data !== null) {
      dispatch(addSubscription(data))
    }
  } catch(e) {
    return console.log(e);    
  }
} 