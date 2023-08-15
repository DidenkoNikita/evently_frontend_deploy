import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { request } from "@/requests/request";
import { UsersList, getListUsers } from "../counter/usersListSlice";

export const getUserList = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<UsersList[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('user_list', {}, 'POST');

    if (data !== null) {
      dispatch(getListUsers(data));
    }
  } catch (e) {
    return console.log(e);
  }
}