import { createSlice } from "@reduxjs/toolkit";


const dateSlice = createSlice({
    name: "date",
    initialState: {
        dates: []
    },
    reducers: {
        saveDates: (state, action) => {
            const { arrival, exit } = action.payload;
            const datesArr = [ arrival, exit ];
            state.dates = datesArr

        }
    }
})



export default dateSlice;
export const { saveDates } = dateSlice.actions;