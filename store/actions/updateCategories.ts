import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { UpdatedCategories, changeCategories } from "../counter/userSlice";

export const updateCategories = (userCategories: { [key: string]: boolean }): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdatedCategories>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('change_categories', { userCategories }, 'PUT')

    if (data !== null) {
      dispatch(changeCategories(data))
    }
  } catch (e) {
    return console.log(e);
  }
}