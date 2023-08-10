import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { UpdateMessageConfidentiality, updateMessagesConfidetiality } from "../counter/userSlice";
import { request } from "@/requests/request";

export const updateConfidentialityMessages = (type: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdateMessageConfidentiality>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user_confidetiality_messages', { type }, 'PUT')

    if (data !== null) {
      dispatch(updateMessagesConfidetiality(data))
    }
  } catch (e) {
    return console.log(e);
  }
}