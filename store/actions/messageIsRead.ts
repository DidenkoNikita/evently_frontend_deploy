import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { IMessage, markMessageAsRead } from "../counter/messageSlice";

export const messageIsRead = (id: number, userId: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IMessage>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('message_is_read', { id, userId }, 'POST');
    if (data !== null) {
      dispatch(markMessageAsRead(data))
    }
  } catch (e) {
    return console.log(e);
  }
} 