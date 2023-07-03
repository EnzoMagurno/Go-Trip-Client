'use client'
import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./Features/Hotel/hotelsSlice"
import usersSlice from "./Features/Users/usersSlice";
import citySlice from "./Features/Citys/CitySlice";
import usersRealSlice from "./Features/UsersReal/usersRealSlice";
import serviceSlice from "./Features/Services/servicesSlice";
import roomSlice from "./Features/Room/RoomSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        hotel: hotelSlice.reducer,
        city: citySlice.reducer,
        usersReal: usersRealSlice.reducer,
        services: serviceSlice.reducer,
        room: roomSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch