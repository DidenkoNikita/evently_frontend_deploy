import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { UpdatedCity, changeCity } from "../counter/userSlice";

export const updateCity = (city: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdatedCity>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user', { city }, 'PUT')

    if (data !== null) {
      dispatch(changeCity(data))
    }
  } catch (e) {
    return console.log(e);
  }
}