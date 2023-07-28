import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { IChat, addChat } from "../counter/chatSLice";

export const createChat = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IChat>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id) {
      const userId = JSON.parse(user_id || '');
      const data = await request('chats', {user1Id: userId ,user2Id: id}, 'POST');
      if (data !== null) {
        dispatch(addChat(data))
      }
    }
  } catch(e) {
    return console.log(e);    
  }
} 