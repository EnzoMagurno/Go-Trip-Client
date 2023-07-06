"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MainGlobal } from '@/redux/mainInterface';
import axios from '../../../utils/axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { GiToken } from 'react-icons/gi';
export const TokenUser = localStorage.token.replace(/["']/g, '');



interface CityName {
	name: string;
	id: string;
}

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


/* const tokenSession = request.cookies.get("gootripCookie") */

	return await axios(`/destination`)
		.then((response) => {
			console.log(response.data)		
			return response.data
		})
		.catch((error) => console.log(error.message));
});

export const fetchingCity = createAsyncThunk('getCity', async (cityName) => {
	
	return await axios
		.get(`/destination/?city=${cityName}` , {
			headers: {
				Authorization: `Bearer ${TokenUser}`,
			},
		} )
		.then((response) => response.data)
		.catch((error) => console.log(error.message));
});


export const getHotelsCoincidencesByCityId = createAsyncThunk(
	'getHotelsByCity',
	async (id) => {

		

		
		if (!id) return;
		return await axios
			.get(`/destination/${id}` , {
				headers: {
					Authorization: `Bearer ${TokenUser}`,
				},
			})
			.then((response) => {
				console.log(response.data) 
			return response.data
		})
			.catch((error) => console.log(error.message));
	}
);
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
				state.hotelByCity = action.payload;
			});
	},
});

export const selectCityState = (state: MainGlobal) => state.city.dataCity;
export const { searchCoincidences, cleanCoincedences, getNameAndIdCity } =
	citySlice.actions;
export default citySlice;
