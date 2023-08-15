import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { Subscription, subscriptionGet } from "../counter/subscriptionSlice";

export const getSubscriptions = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Subscription[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('get_subscribtion', {}, 'POST');
    if (data !== null) {
      dispatch(subscriptionGet(data));
    }
  } catch (e) {
    return console.log(e);
  }
}