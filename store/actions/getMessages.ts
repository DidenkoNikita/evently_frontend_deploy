import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { IMessage, messagesGet } from "../counter/messageSlice";

export const getMessages = (data: IMessage[]): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<IMessage[]>
> => (dispatch): void => {
  dispatch(messagesGet(data));
}