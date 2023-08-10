import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Subscription, deleteSubscription } from "../counter/subscriptionSlice";

export const removeSubscription = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Subscription>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('remove_subscription', { brand_id: id }, 'DELETE');
    console.log('data', data);
    
    if (data !== null) {
      dispatch(deleteSubscription(data))
    }
  } catch (e) {
    return console.log(e);
  }
} 