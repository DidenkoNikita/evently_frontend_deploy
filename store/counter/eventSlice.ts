import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Event {
  id: number;
  brand_id: number;
  name: string;
  address: string;
  phone: string;
  name_site: string;
  site_link: string;
  date: string;
  link_photo: string;
}

export const eventSLice = createSlice({
  name: 'event',
  initialState: initialState.event,
  reducers: {
    getEvents: (state, action: PayloadAction<Event[]>): void => {
      const { payload } = action;
      payload.map((event: Event) => {
        if (!state.find((e: Event) => e.id === event.id)) {
          state.push(event);
        }
      })
    }
  }
});

export const {
  getEvents
} = eventSLice.actions;