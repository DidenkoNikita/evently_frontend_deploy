import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Data, User, changeCategories, changeCity } from "../counter/userSlice";
import { request } from "@/requests/request";

export const updateCity = (city: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Data>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user', {city}, 'PUT')
    console.log(data);
    
    if (data !== null) {
      dispatch(changeCity(data))
    }
  } catch(e) {
    return console.log(e);
  }
}