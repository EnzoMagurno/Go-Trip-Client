import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MainGlobal } from '@/redux/mainInterface';

interface CityName {
	name: string;
	id: string;
}

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5MjFkYWVlNC03Y2IxLTRjODUtOWFmMy1kZGNlYTZlNjVmYjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgwNjc3NzYsImV4cCI6MTY4ODA3NDk3Nn0.QWfEDG44Xk2qPoS3oPuCatNyBYlws99dhOK_-KJTM2M"

export interface City {
	id: number;
	country: string;
	state: string;
	city: string;
	moneyType: string;
	status: boolean;
}

export interface InitialStateCity {
	dataCity: City[];
	copyDataCity: City[];
	status: string;
	error: string | null;
}

export const fetchingCities = createAsyncThunk('getCities', async () => {
	return await fetch(`http://localhost:3001/destination`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			return data;
		})
		.catch((error) => console.log(error.message));
});

export const fetchingCity = createAsyncThunk('getCity', async (city) => {
	return await fetch(`http://localhost:3001/destination/?city=${city}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			return data;
		})
		.catch((error) => console.log(error.message));
});


export const getHotelsCoincidencesByCityId = createAsyncThunk('getHotelsByCity', async (id) => {
	if(!id) return 
	console.log(id)
	return await fetch(`http://localhost:3001/destination/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			return data;
		})
		.catch((error) => console.log(error.message));
});
const citySlice = createSlice({
	name: 'city',
	initialState: {
		dataCity: [],
		copyDataCity: [],
		hotelByCity: [],
		city: {},
		status: 'idle',
		error: null,
	},
	reducers: {
		searchCoincidences: (state, action) => {
			if (!action.payload) {
				state.copyDataCity = [];
			} else {
				state.copyDataCity = state.dataCity.filter((city: City) =>
					city.city.toLowerCase().includes(action.payload.toLowerCase())
				);
			}
		},
		cleanCoincedences: (state) => {
			state.copyDataCity = [];
		},
		getNameAndIdCity: (state, action) => {
			state.city = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchingCity.fulfilled, (state: InitialStateCity, action) => {
				if (action.payload === 'Sorry this city is not founded')
					state.copyDataCity = [];
				else state.copyDataCity = action.payload;
			})
            .addCase(fetchingCities.fulfilled, (state, action) => {
			 state.dataCity = action.payload; 
			})
			.addCase(getHotelsCoincidencesByCityId.fulfilled, (state, action) => {
				state.hotelByCity = action.payload
				console.log(action.payload)
			})
			
	},
});

export const selectCityState = (state: MainGlobal) => state.city.copyDataCity;
export const { searchCoincidences, cleanCoincedences, getNameAndIdCity } = citySlice.actions;
export default citySlice;
