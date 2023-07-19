import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { User, getUser } from "../counter/userSlice";
import { request } from "@/requests/request";

export const userGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<User[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user', {} , 'POST');

    console.log("fuckfuckfuck", data);
    
    
    const userData = [data.user]
    console.log(userData);
    
    if (data !== null) {      
      dispatch(getUser(userData));
    }
  } catch(e) {
    return console.log(e);
  }
}