import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { IChat, chatsGet } from "../counter/chatSLice";

export const getChats = (data: IChat[]): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IChat[]>
> => (dispatch): void => {
  dispatch(chatsGet(data));
}