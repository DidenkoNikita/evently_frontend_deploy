import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { User, getUser } from "../counter/userSlice";
import { request } from "@/requests/request";

export const userGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<User>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user', {} , 'POST');
        
    if (data !== null) {      
      dispatch(getUser(data));
    }
  } catch(e) {
    return console.log(e);
  }
}