import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export interface Brand {
  id: number;
  name: string;
  address: string;
  name_site: string;
  site_link: string;
  link_photo: string;
  phone: string;
  type: string;
  city: string;
  age: string;
  hours: string;
  category: string;
  date: string;
}

export const brandSLice = createSlice({
  name: 'brand',
  initialState: initialState.brand,
  reducers: {
    getBrand: (state, action: PayloadAction<Brand[]>): Brand[] => {
      const {payload} = action;
      
      return state = payload
    },
  }
});

export const {
  getBrand,
} = brandSLice.actions;