'use client'
import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./Features/Hotel/hotelsSlice"
import usersSlice from "./Features/Users/usersSlice";
export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        hotel: hotelSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch