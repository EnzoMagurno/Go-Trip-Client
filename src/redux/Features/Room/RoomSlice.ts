import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchRoomById = createAsyncThunk(
    "booking/fetchRoomById",
    async (roomId, { rejectWithValue }) => {
        const TOKEN = process.env.NEXT_PUBLIC_TOKEN_FETCH
        try {
            const response = await axios.get(`/rooms/findRooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
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

const roomSlice = createSlice({
    name: "room",
    initialState: {
        room: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.room = action.payload;
            })
    },
});

export const selectRoomIdState = (state) => state.room.room
export default roomSlice.reducer;
