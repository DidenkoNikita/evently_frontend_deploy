import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { MuteUser, userMute } from "../counter/userSlice";

export const muteUser = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<MuteUser>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('mute_user', { id }, 'PUT');

    if (data !== null) {
      dispatch(userMute(data));
    }
  } catch (e) {
    return console.log(e);
  }
}