import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Data, UpdatedMood, User, changeCategories, changeMood } from "../counter/userSlice";
import { request } from "@/requests/request";

export const updateMood = (userMood: { [key: string]: boolean }): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdatedMood>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('change_mood', {userMood}, 'PUT')
    console.log(data);
    
    if (data !== null) {
      dispatch(changeMood(data))
    }
  } catch(e) {
    return console.log(e);
  }
}