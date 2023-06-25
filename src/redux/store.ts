'use client'
import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./Features/Hotel/hotelsSlice"
import usersSlice from "./Features/Users/usersSlice";
import citySlice from "./Features/Citys/CitySlice";
export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        hotel: hotelSlice.reducer,
        city: citySlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch