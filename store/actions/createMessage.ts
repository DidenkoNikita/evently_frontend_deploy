import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { IMessage, addMessage } from "../counter/messageSlice";

export const createMessage = (id: number, text: string, chatId: number | null): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IMessage>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('messages', {user2Id: id, text, chatId}, 'POST');
    if (data !== null) {
      dispatch(addMessage(data))
    }
  } catch(e) {
    return console.log(e);    
  }
} 