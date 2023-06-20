import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchingHotel = createAsyncThunk("getHotels", async () => {
    return await fetch("http://localhost:3001/hotels")
    .then(response => response.json())
    .then(data => data)
})



const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotelData: [],
        copyHotelData: [],
        status: "idle",
        error: null
    },
    reducers: {
      getHotelsCoincidence: (state, action) => {
        state.copyHotelData = state.hotelData.filter(hotel =>  hotel.city_id == action.payload)
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchingHotel.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchingHotel.fulfilled, (state, action) => {
            state.hotelData = action.payload
            console.log(action.payload)
            
        })
        .addCase(fetchingHotel.rejected, (state, action) => {
            state.error = action.error.message || null
        })
    }
})



export default hotelSlice;
export const selectHotelState = (state) => state.hotel.copyHotelData
export const { getHotelsCoincidence } = hotelSlice.actions 