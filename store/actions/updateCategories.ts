import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Data, User, changeCategories } from "../counter/userSlice";
import { request } from "@/requests/request";

export const updateCategories = (userCategories: { [key: string]: boolean }): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Data>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('change_categories', {userCategories}, 'PUT')
    console.log(data);
    
    if (data !== null) {
      dispatch(changeCategories(data))
    }
  } catch(e) {
    return console.log(e);
  }
}