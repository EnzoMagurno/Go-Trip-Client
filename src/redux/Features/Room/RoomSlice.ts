import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/utils/axios'

import { TokenUser } from "../Citys/CitySlice";
export interface InitialStateRoom {
    roomData: {}
    copyRoomData: {}
    room: []
}

export const fetchRoomById = createAsyncThunk(
    "booking/fetchRoomById",
    async (roomId, { rejectWithValue }) => {
        
        try {
            const response = await axios.get(`/rooms/findRooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${TokenUser}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(roomId, 'ROOM ID PAAA');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchingRooms = createAsyncThunk("getRooms", async () => {
    try {
      
  
      const response = await axios.get("/rooms/findRooms", {
  
        headers: {
          Authorization: `Bearer ${TokenUser}`
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

const RoomSlice = createSlice({
    name: "Room",
    initialState: {
        roomData: {},
    copyRoomData: {},
    room: {}
    },
    reducers: {
        getRoomCoincidence: (state, action) => {

    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchingRooms.fulfilled, (state, action) => {
        state.RoomData = action.payload


      })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.room = action.payload;
            })
    },
});

export default RoomSlice;
export const selectRoomIdState = (state) => state.room.room
export const selectRoomState = (state) => state.room.room
export const { getRoomCoincidence } = RoomSlice.actions 