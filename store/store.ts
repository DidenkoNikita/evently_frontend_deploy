import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./counterSlice";

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RooteState = ReturnType<typeof store.getState>;