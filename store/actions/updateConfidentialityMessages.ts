import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { UpdateMessageConfidentiality, updateMessagesConfidetiality } from "../counter/userSlice";

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