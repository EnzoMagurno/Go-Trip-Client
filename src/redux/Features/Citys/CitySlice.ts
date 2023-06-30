import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MainGlobal } from "@/redux/mainInterface";
import { log } from "console";



export interface City {
    id: number
    country: string,
    state: string
    city: string,
    moneyType: string
    status: boolean
    hotel: []
}

export interface InitialStateCity {
    dataCity: City[]
    copyDataCity: City[]
    status: string
    error: string | null
}



export const fetchingCity = createAsyncThunk("getCity", async () => {
    const token = process.env.NEXT_PUBLIC_TOKEN_FETCH

    return await fetch("http://localhost:3001/destination", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(response => response.json())
    .then(data => {
        
        return data
    })
})  


const citySlice = createSlice({
    name: "city",
    initialState: {
        dataCity: [],
        copyDataCity: [],
        status: "idle",
        error: null
    },
    reducers: {
        searchCoincidences: (state, action) => {
            if (!action.payload) {
                state.copyDataCity = []
            } else {
                state.copyDataCity = state.dataCity.filter((city: City) => city.city
                .toLowerCase()
                .includes(action.payload.toLowerCase())) 
            }   
        },
        cleanCoincedences: (state) => {
            state.copyDataCity = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchingCity.pending, (state: InitialStateCity) => {
            state.status = "pending"
        })
        .addCase(fetchingCity.fulfilled, (state: InitialStateCity, action) => {
            state.dataCity = action.payload
            
            
        })
        .addCase(fetchingCity.rejected, (state: InitialStateCity, action) => {
            state.error = action.error.message || null
        })
    }
})



export const selectCityState = (state: MainGlobal) => state.city.copyDataCity
export const { searchCoincidences, cleanCoincedences } = citySlice.actions; 
export default citySlice;






