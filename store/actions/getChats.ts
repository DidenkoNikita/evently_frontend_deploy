import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { IChat, chatsGet } from "../counter/chatSLice";

export const getChats = (data: IChat[]): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IChat[]>
> => (dispatch): void => {
  dispatch(chatsGet(data));
}