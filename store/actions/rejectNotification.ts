import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Data, deleteNotification } from "../counter/notificationSlice";

export const rejectNotification = (id: number, creator_id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Data>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      const data = await request('reject_notifiaction', {id, creator_id}, 'POST');
      if (data !== null) {
        dispatch(deleteNotification(data))        
      }
    }
  } catch(e) {
    return console.log(e);    
  }
} 