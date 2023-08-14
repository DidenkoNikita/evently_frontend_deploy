import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { ChangeTheme, changeTheme } from "../counter/userSlice";
import { request } from "@/requests/request";

export const changeColorTheme = (theme: boolean): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<ChangeTheme>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('change_color_theme', {theme}, 'PUT');
    
    if (data !== null) {
      dispatch(changeTheme(data));
    }
  } catch(e) {
    return console.log(e);
  }
}