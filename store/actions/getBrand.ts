import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Brand, getBrand } from "../counter/brandSlice";

export const brandGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Brand>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('brand', {} , 'POST');
        
    if (data !== null) {      
      dispatch(getBrand(data));
    }
  } catch(e) {
    return console.log(e);
  }
}