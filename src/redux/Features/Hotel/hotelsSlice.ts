import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchingHotel = createAsyncThunk("getHotels", async () => {
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
      const response = await fetch("http://localhost:3001/hotel/findHotel", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al obtener los hoteles:', error);
      throw error;
    }
  });

  export const fetchinHotelId = createAsyncThunk("getHotel", async (id) => {
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
      const response = await fetch(`http://localhost:3001/hotel/findhotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al obtener el hotel:', error);
      throw error;
    }
  });

  export const updateHotel = createAsyncThunk("postHotel", async (updatedData) => {
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
      const response = await axios.put("http://localhost:3001/hotel/updhotel", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = response.data.detail;
      return data;
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al actualizar el hotel:', error);
      throw error;
    }
  });


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
        state.copyHotelData = state.hotelData.filter(hotel =>  hotel.destinationId == action.payload)
        console.log(action.payload)
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
            console.log(action)
        })
    }
})



export default hotelSlice;
export const selectHotelIdState = (state) => state.hotel.hotel
export const selectOriginalHotelState = (state) => state.hotel.hotelData 
export const selectHotelState = (state) => state.hotel.copyHotelData
export const { getHotelsCoincidence } = hotelSlice.actions 