import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Subscription, subscriptionGet } from "../counter/subscriptionSlice";
import { request } from "@/requests/request";

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
  } catch(e) {
    return console.log(e);
  }
}