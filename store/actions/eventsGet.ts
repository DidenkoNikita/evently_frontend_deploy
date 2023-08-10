import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Event, getEvents } from "../counter/eventSlice";

export const eventsGet = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Event[]>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('event', {}, 'POST');
    if (data !== null) {      
      dispatch(getEvents(data));
    }
  } catch(e) {
    return console.log(e);
  }
}