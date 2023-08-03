import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Notification, getNotifications } from "../counter/notificationSlice";

export const notificationsGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Notification[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('get_notifiactions', {} , 'POST');
        
    if (data !== null) {      
      dispatch(getNotifications(data));
    }
  } catch(e) {
    return console.log(e);
  }
}