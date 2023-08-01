import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Chat, removeChat } from "../counter/chatSLice";

export const deleteChat = (id: number | null): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Chat>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      const data = await request('chats', {id}, 'DELETE');
      if (data !== null) {
        dispatch(removeChat(data))        
      }
    }
  } catch(e) {
    return console.log(e);    
  }
} 