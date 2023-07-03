import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MainGlobal } from '@/redux/mainInterface';
const TOKEN_FETCH = process.env.NEXT_PUBLIC_TOKEN_FETCH;




interface CityName {
	name: string;
	id: string;
}


export interface City {
    id: number
    country: string,
    state: string
    city: string,
    moneyType: string
    status: boolean
}

export interface InitialStateCity {
	dataCity: City[];
	copyDataCity: City[];
	status: string;
	error: string | null;
}

export const fetchingCities = createAsyncThunk('getCities', async () => {
	return await fetch(`https://gotrippf-production.up.railway.app/destination`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN_FETCH }`
        }
    })
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			return data;
		})
		.catch((error) => console.log(error.message));
});

export const fetchingCity = createAsyncThunk("getCity", async (cityName) => {
	
    return await fetch(`https://gotrippf-production.up.railway.app/destination/?city=${cityName}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN_FETCH }`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
	.catch(error => console.log(error.message))
});


export const getHotelsCoincidencesByCityId = createAsyncThunk('getHotelsByCity', async (id) => {
	if(!id) return 
	console.log(id)
	return await fetch(`https://gotrippf-production.up.railway.app/destination/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${TOKEN_FETCH }`
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

export const selectCityState = (state: MainGlobal) => state.city.dataCity;
export const { searchCoincidences, cleanCoincedences, getNameAndIdCity } = citySlice.actions;
export default citySlice;
