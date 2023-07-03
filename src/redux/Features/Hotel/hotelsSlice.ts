import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN_FETCH = process.env.NEXT_PUBLIC_TOKEN_FETCH;
const token = process.env.NEXT_PUBLIC_TOKEN_FETCH



/* interface InitialStateHotel {
    hotelData: [],
    copyHotelData: [],
    hotel: {}
} */

export const fetchingHotel = createAsyncThunk("getHotels", async () => {
    try {
      const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
      const response = await axios.get("/hotel/findHotel", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.data;
      return data;
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al obtener los hoteles:', error);
      throw error;
    }
  });

  export const fetchinHotelId = createAsyncThunk("getHotel", async (id) => {
    try {
      
      const response = await axios.get(`/hotel/findhotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = await response.data;
      return data;
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al obtener el hotel:', error);
      throw error;
    }
  });

  export const updateHotel = createAsyncThunk("postHotel", async (updatedData) => {
    try {
      const response = await axios.put("/hotel/updhotel", updatedData, {
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


  export const deleteHotel = createAsyncThunk("deleteHotel", async (id) => {
    return axios.delete(`/hotel/delHotel/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${TOKEN_FETCH}`
        }
    })
    .then(response => response.data)
})


const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotelData: [],
        copyHotelData: [],
        hotel: {}
    },
    reducers: {
      getHotelsCoincidence: (state, action) => {
        
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
        .addCase(deleteHotel.fulfilled, (state, action) => {
            state.hotel = action.payload
             
         })
    }
})



export default hotelSlice;
export const selectHotelIdState = (state) => state.hotel.hotel
export const selectOriginalHotelState = (state) => state.hotel.hotelData 
export const selectHotelState = (state) => state.hotel.copyHotelData
export const { getHotelsCoincidence } = hotelSlice.actions 