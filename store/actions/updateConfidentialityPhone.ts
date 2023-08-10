import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { UpdatePhoneConfidentiality, updatePhoneConfidetiality } from "../counter/userSlice";
import { request } from "@/requests/request";

export const updateConfidentialityPhone = (type: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UpdatePhoneConfidentiality>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user_confidetiality_phone', { type }, 'PUT')

    if (data !== null) {
      dispatch(updatePhoneConfidetiality(data))
    }
  } catch (e) {
    return console.log(e);
  }
}