import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { IMessage, messagesGet } from "../counter/messageSlice";

export const getMessages = (data: IMessage[]): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IMessage[]>
> => (dispatch): void => {
  dispatch(messagesGet(data));
}