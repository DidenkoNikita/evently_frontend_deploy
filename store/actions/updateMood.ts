import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { UpdatedMood, changeMood } from "../counter/userSlice";

export const updateMood = (userMood: { [key: string]: boolean }): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdatedMood>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('change_mood', { userMood }, 'PUT')

    if (data !== null) {
      dispatch(changeMood(data))
    }
  } catch (e) {
    return console.log(e);
  }
}