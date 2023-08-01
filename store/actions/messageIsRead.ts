import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { IMessage, addMessage, markMessageAsRead } from "../counter/messageSlice";

export const messageIsRead = (id: number, userId: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IMessage>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('message_is_read', {id, userId}, 'POST');
    if (data !== null) {
      dispatch(markMessageAsRead(data))
    }
  } catch(e) {
    return console.log(e);    
  }
} 