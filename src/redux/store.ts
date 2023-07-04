'use client'
import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./Features/Hotel/hotelsSlice"
import citySlice from "./Features/Citys/CitySlice";
import usersRealSlice from "./Features/UsersReal/usersRealSlice";
import serviceSlice from "./Features/Services/servicesSlice";
import roomSlice from "./Features/Room/RoomSlice";
import gallerySlice from "./Features/Gallery/GallerySlice";

import dateSlice from "./Features/Dates/DatesSlice";
export const store = configureStore({
        reducer: {
                hotel: hotelSlice.reducer,
                city: citySlice.reducer,
                usersReal: usersRealSlice.reducer,
                services: serviceSlice.reducer,
                room: roomSlice,
                date: dateSlice.reducer,
                gallery: gallerySlice.reducer

        }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch