import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchingHotel = createAsyncThunk("getHotels", async () => {
    return await fetch("http://localhost:3001/hotel/findHotel")
    .then(response => response.json())
    .then(data => data)
})

export const fetchinHotelId = createAsyncThunk("getHotel", async (id) => {
    return axios.get(`http://localhost:3001/hotel/findhotel/${id}`).then(response => response.data)
})


export const updateHotel = createAsyncThunk("postHotel", async (updatedData) => {

    return axios.put(`http://localhost:3001/hotel/updhotel`, updatedData).then(response =>  response.data.detail)
})


const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotelData: [],
        copyHotelData: [],
        hotel: {},
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
        .addCase(fetchingHotel.fulfilled, (state, action) => {
            state.hotelData = action.payload

            
        })
        .addCase(fetchinHotelId.fulfilled, (state, action) => {
            state.hotel = action.payload;
            
        })
        .addCase(updateHotel.fulfilled, (state, action) => {
           state.hotel = action.payload
            
        })
    }
})



export default hotelSlice;
export const selectHotelIdState = (state) => state.hotel.hotel
export const selectOriginalHotelState = (state) => state.hotel.hotelData 
export const selectHotelState = (state) => state.hotel.copyHotelData
export const { getHotelsCoincidence } = hotelSlice.actions 