import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




const bookingFetch = createAsyncThunk('booking', async () => {
    return await fetch('')
        .then(response => response.json())
        .then(data => {
            return data
        })
})

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: {}
    }, reducers: {
        createBooking: (state, action) => {
            state.bookings = action.payload
        }
    }
})