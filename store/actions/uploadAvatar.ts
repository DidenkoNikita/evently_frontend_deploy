import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Avatar, User } from "../counter/userSlice";
import { request } from "@/requests/requestParam";

export const uploadAvatar = (selectedFile: any): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Avatar>
> => async (dispatch): Promise<void | unknown> => {
try {
  const formData = new FormData();
  formData.append('file', selectedFile);  

  const data = await request('upload_avatar', formData, 'PUT')
  
  if (data !== null) {
    dispatch(uploadAvatar(data))
  }
} catch(e) {
  return console.log(e);
}
}