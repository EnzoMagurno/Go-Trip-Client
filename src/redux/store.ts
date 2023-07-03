'use client'
import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./Features/Hotel/hotelsSlice"
import citySlice from "./Features/Citys/CitySlice";
import usersRealSlice from "./Features/UsersReal/usersRealSlice";
import serviceSlice from "./Features/Services/servicesSlice";
import dateSlice from "./Features/Dates/DatesSlice";
export const store = configureStore({
    reducer: {
        hotel: hotelSlice.reducer,
        city: citySlice.reducer,
        usersReal: usersRealSlice.reducer,
        services: serviceSlice.reducer,
        date: dateSlice.reducer

    }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch