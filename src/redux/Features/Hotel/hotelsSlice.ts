
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { TokenUser } from "../Citys/CitySlice";

/* interface InitialStateHotel {
    hotelData: [],
    copyHotelData: [],
    hotel: {}
} */

export const fetchingHotel = createAsyncThunk<void>('getHotels', async (): Promise<any> => {

	try {
		

		const response = await axios.get('/hotel/findHotel');

		const data = await response.data;
		return data;
	} catch (error) {
		// Manejar el error según tus necesidades
		console.error('Error al obtener los hoteles:', error);
		throw error;
	}
});


export const  fetchinHotelId = createAsyncThunk("getHotel", async (id: string) => {
  try {

    


    const response = await axios.get(`/hotel/findhotel/${id}`, {

      headers: {
        Authorization: `Bearer ${TokenUser}`
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

interface hotel {
	email?: string
	id: string
	phone?: string
	name: string
	checkIn?: string
	checkOut?: string
	overview?:string
}


export const updateHotel = createAsyncThunk(
	'postHotel',
	async (updatedData: hotel) => {
		try {


			const response = await axios.put('/hotel/updhotel', updatedData, {
				headers: {
					Authorization: `Bearer ${TokenUser}`,
				},
			});

			const data = response.data.detail;
			return data;
		} catch (error) {
			// Manejar el error según tus necesidades
			console.error('Error al actualizar el hotel:', error);
			throw error;
		}
	}
);

export const deleteHotel = createAsyncThunk('deleteHotel', async (id: string) => {
	return axios
		.delete(`/hotel/delHotel/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${TokenUser}`,
			},
		})
		.then((response) => {
			return response.data;
		});
});

export const restoreHotel = createAsyncThunk('restoreHotel', async (id: string) => {
	return axios
		.put(`/hotel/restoreHotel/${id}`, null, {
			headers: {
				Authorization: `Bearer ${TokenUser}`,
			},
		})
		.then((response) => {
			return response.data;
		});
});

export const getDeletedHotels = createAsyncThunk(
	'getDeletedHotel',
	async () => {
		return axios
			.get(`/hotel/readDeletedHotel`, {
				headers: {
					Authorization: `Bearer ${TokenUser}`,
				},
			})
			.then((response) => response.data)
			.catch((error) => error.message);
	}
);

interface hotel {
	name: string
}

interface InitialStateHotel {
		hotelData: hotel[],
		copyHotelData: hotel[],
		hotelsDeleted: hotel[],
		copyHotelsDeleted: hotel[],
		filterHotelStatus: string,
		orderAlpha: string,
    responseSuccesfull: hotel,
		hotel: hotel,
}

const hotelSlice = createSlice({
	name: 'hotel',
	initialState: {
		hotelData: [],
		copyHotelData: [],
		hotelsDeleted: [],
		copyHotelsDeleted: [],
		filterHotelStatus: 'All hotels',
		orderAlpha: 'A - Z',
    responseSuccesfull: {},
		hotel: {},
	},
	reducers: {
		searchByName: (state, action) => {
      
      if (state.filterHotelStatus === "Active hotels") { 
      state.copyHotelData = [ ...state.hotelData ].filter((hotel: any) => hotel.name.toLowerCase().includes(action.payload.toLowerCase()))
      } else if (state.filterHotelStatus === "Disabled hotels") {
        state.copyHotelsDeleted = [ ...state.hotelsDeleted ].filter((hotel: any) => hotel.name.toLowerCase().includes(action.payload.toLowerCase()))
    } else if (state.filterHotelStatus === "All hotels") {
      state.copyHotelData = [ ...state.hotelData ].filter((hotel: any) => hotel.name.toLowerCase().includes(action.payload.toLowerCase()))
      state.copyHotelsDeleted = [ ...state.hotelsDeleted ].filter((hotel: any) => hotel.name.toLowerCase().includes(action.payload.toLowerCase()))

    }
      }, 
		filterHotelsByStatus: (state, action) => {
			if (action.payload === 'active') {
				state.filterHotelStatus = 'Active hotels';
        state.orderAlpha = "A - Z"
        state.copyHotelsDeleted = []
			} else if (action.payload === 'disabled') {
				state.filterHotelStatus = 'Disabled hotels';
        state.orderAlpha = "A - Z"
        state.copyHotelData = []
			} else {
				state.filterHotelStatus = 'All hotels';
        state.orderAlpha = "A - Z"
        state.copyHotelData = state.hotelData
        state.copyHotelsDeleted = state.hotelsDeleted
			}
		},
    orderHotelsAlpha: (state, action) => {

      if (action.payload === "az" && state.filterHotelStatus === "Active hotels") {
        state.orderAlpha = "A - Z"
        state.copyHotelData = [...state.copyHotelData].sort((a: any, b:any) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

      } else if (action.payload === "za" && state.filterHotelStatus === "Active hotels") {
        
        state.orderAlpha = "Z - A"
        state.copyHotelData = [...state.copyHotelData].sort((a: any, b: any) => {
          if (a.name < b.name) {
              return 1
          } 

          if (a.name > b.name) {
              return -1
          }

          return 0
      })
        
      } else if (action.payload === "az" && state.filterHotelStatus === "Disabled hotels") {
        state.orderAlpha = "A - Z"
        state.copyHotelsDeleted = [...state.copyHotelsDeleted].sort((a: any, b: any) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

      } else if (action.payload === "za" && state.filterHotelStatus === "Disabled hotels") {
        state.orderAlpha = "Z - A"
        state.copyHotelsDeleted = [...state.copyHotelsDeleted].sort((a: any, b: any) => {
          if (a.name < b.name) {
              return 1
          } 

          if (a.name > b.name) {
              return -1
          }

          return 0
      })
        
      } else if (action.payload === "az" && state.filterHotelStatus === "All hotels") {
        state.orderAlpha = "A - Z"
        state.copyHotelData = [...state.copyHotelData].sort((a: any, b: any) => {
          if (a.name < b.name) {
              return -1
          } 

          if (a.name > b.name) {
              return 1
          }

          return 0
      })
      state.copyHotelsDeleted = [...state.copyHotelData].sort((a: any, b: any) => {
        if (a.name < b.name) {
            return -1
        } 

        if (a.name > b.name) {
            return 1
        }

        return 0
    })

      } else if (action.payload === "za" && state.filterHotelStatus === "All hotels") {
        state.orderAlpha = "Z - A"
        state.copyHotelData = [...state.copyHotelData].sort((a: any, b: any) => {
          if (a.name < b.name) {
              return 1
          } 

          if (a.name > b.name) {
              return -1
          }

          return 0
      })
      state.copyHotelsDeleted = [...state.copyHotelsDeleted].sort((a: any, b: any ) => {
        if (a.name < b.name) {
            return 1
        } 

        if (a.name > b.name) {
            return -1
        }

        return 0
    })
        
      }
    }
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchingHotel.fulfilled, (state: any, action: any ) => {
        
        if (state.filterHotelStatus === "Disabled hotels") return
				const hotelsOrdered = [...action.payload].sort((a: any, b: any) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				state.hotelData = hotelsOrdered;
				state.copyHotelData = hotelsOrdered;
			})
			.addCase(fetchinHotelId.fulfilled, (state, action) => {
				state.hotel = action.payload;
			})
			.addCase(updateHotel.fulfilled, (state, action) => {
				state.hotel = action.payload;
			})
			.addCase(deleteHotel.fulfilled, (state, action) => {
				state.hotel = action.payload;
        state.responseSuccesfull = action.payload
			})
			.addCase(restoreHotel.fulfilled, (state, action) => {
        state.responseSuccesfull = action.payload
        console.log(state.responseSuccesfull)
			})
			.addCase(getDeletedHotels.fulfilled, (state: any, action: any) => {
        if (action.payload === "Request failed with status code 401") {


          state.hotelsDeleted = []
				state.copyHotelsDeleted = []


        } else {


          if (state.filterHotelStatus === "Active hotels") return  
        
				if (!Array.isArray(action.payload)) return;

				const hotelsDeletedOrdered = [...action.payload].sort((a: any, b: any) => {
					if (a.name < b.name) {
						return -1;
					}

					if (a.name > b.name) {
						return 1;
					}

					return 0;
				});
				state.hotelsDeleted = hotelsDeletedOrdered;
				state.copyHotelsDeleted = hotelsDeletedOrdered;
        }
       
			});
	},
});

export default hotelSlice;
export const selectHotelIdState = (state: any) => state.hotel.hotel;
export const selectOriginalHotelState = (state: any) => state.hotel.hotelData;
export const selectHotelState = (state: any) => state.hotel.copyHotelData;
export const { searchByName, filterHotelsByStatus, orderHotelsAlpha } = hotelSlice.actions;
