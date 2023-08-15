import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
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
    if (data !== null) {
      dispatch(deleteSubscription(data))
    }
  } catch (e) {
    return console.log(e);
  }
} 