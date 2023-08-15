import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { User, getUser } from "../counter/userSlice";

export const userGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<User>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user', {}, 'POST');

    if (data !== null) {
      dispatch(getUser(data));
    }
  } catch (e) {
    return console.log(e);
  }
}