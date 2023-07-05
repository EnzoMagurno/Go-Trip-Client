import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainGlobal } from "../../mainInterface";
import axios from "../../../utils/axios";

const TOKEN_FETCH = process.env.NEXT_PUBLIC_TOKEN_FETCH;
const getTokenSession = () => {
    return localStorage.getItem("token");
  };

export const fetchingUsersReal = createAsyncThunk("getUsersReal", async () => {
        const tokenSession = getTokenSession()

        const response = await axios.get("/User/readUser/",{
            headers:{
                Authorization:`Bearer ${TOKEN_FETCH}`
            }
        });
        console.log(response.data)
      return response.data;
    })




    export const updatingUsersReal = createAsyncThunk("updateUsersReal", async (newDataUser) => {

        console.log(newDataUser)
        const tokenSession = getTokenSession()


        const response = await axios.put(`/User/updateUser/${newDataUser.id}`, newDataUser,{
            headers:{
                Authorization:`Bearer ${TOKEN_FETCH}`
            }
        } );
        console.log(response.data)
      return response.data; 
    })

    export const deleteUsersReal = createAsyncThunk("deleteUsersReal", async (id) => {

        
        const tokenSession = getTokenSession()


        const response = await axios.delete(`/User/deleteUser/${id}`, {

            headers:{
                Authorization:`Bearer ${TOKEN_FETCH}`
            }
        } )
        console.log(response.data)
      return response.data; 
    })
    
    export const activeUsersReal = createAsyncThunk("activeUsersReal", async (id) => {

        
        const tokenSession = getTokenSession()
        console.log(id)
        
        
        
        return await axios.put(`User/restoreUser/${id}`, null, {
            headers:{
                Authorization:`Bearer ${TOKEN_FETCH}`
            }
        } )
        .then(response => response.data)
        .catch(error => console.log(error));
    

    })

    export const getallUsersReal = createAsyncThunk("readAllUsersReal", async (id) => {

        
        const tokenSession = getTokenSession()


        const response = await axios.get(`/user/readDeletedUsers`,{
            headers:{
                Authorization:`Bearer ${TOKEN_FETCH}`
            }
        } );
        console.log(response.data)
      return response.data; 
    })
    


export interface User { 
    id: string,
    name: string,
    photoUser: string
    postalCode: string,
    birthday: string,
    country: string,
    phone: string,
    phoneCode: string,
    gender: string | null,
    email: string,
    password: string,
    confirmPassword: string,
    address: string,
    dniPasaport: string,
    status: boolean,
    rol: string,
    dniPassport:string
    thirdPartyCreated: boolean,

 }

export interface InitialStateRealUser {
    usersReal: User[]
    usersRealCopy: User[]
    status: string
    error: string | null
 }


const usersRealSlice = createSlice({
    name: "usersReal",
    initialState: {
        usersReal: [],
        userUpdated: {},
        usersRealCopy: [],
        usersDeletedCopy: [],
        allUsers: false,
        usersDeleted: [],
        usersFilter: [],
        orderAlpha: "A - Z",
        filterBy: "Active users",
        status: "idle",
        error: null
    },
    reducers: {
        nameEdit: (state, action) => {;
        },
        searchByName: (state, action) => {

            


            if(state.allUsers) {
                state.usersRealCopy = [ ...state.usersReal].filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
                state.usersDeletedCopy = [...state.usersDeleted].filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
            } else if (state.usersFilter[0]?.deletedAt === null) {
                state.usersFilter = state.usersReal.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase())).length 
                ? state.usersReal.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase())) 
                : state.usersFilter = state.usersFilter

            } else if (typeof state.usersFilter[0]?.deletedAt === "string"){

                state.usersFilter = state.usersDeleted.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase())).length
                ? state.usersDeleted.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
                : state.usersFilter = state.usersFilter
            }

        },
        filterByStatus: (state, action) => {
            
            if (action.payload === "active") {
                state.filterBy = "Active users"
                state.allUsers = false
                state.orderAlpha = "A - Z"
                state.usersFilter = state.usersReal.filter(user => !user.deletedAt)
            } else if (action.payload === "disabled"){
                state.filterBy = "Disabled users"
                state.orderAlpha = "A - Z"
                state.allUsers = false
                state.usersFilter = state.usersDeleted.filter(user => user.deletedAt).sort((a, b) => {
                    
                    if (a.name < b.name) {
                        return -1
                    } 

                    if (a.name > b.name) {
                        return 1
                    }

                    return 0
                })
            } else if (action.payload === "all") {
                state.filterBy = "All users"
                state.orderAlpha = "A - Z"
                state.allUsers = true
            }
        },
        orderAlpha: (state, action) => {

            if (state.allUsers && action.payload === "az") {
                state.orderAlpha = "A - Z"
                state.usersRealCopy = [ ...state.usersRealCopy].sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    } 

                    if (a.name > b.name) {
                        return 1
                    }

                    return 0
                })

                state.usersDeletedCopy = [ ...state.usersDeletedCopy ].sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    } 

                    if (a.name > b.name) {
                        return 1
                    }

                    return 0
                })
            } else if (state.allUsers && action.payload === "za") {
                state.orderAlpha = "Z - A"
                state.usersRealCopy = [ ...state.usersRealCopy].sort((a, b) => {
                    if (a.name < b.name) {
                        return 1
                    } 

                    if (a.name > b.name) {
                        return -1
                    }

                    return 0
                })

                state.usersDeletedCopy = [ ...state.usersDeletedCopy ].sort((a, b) => {
                    if (a.name < b.name) {
                        return 1
                    } 

                    if (a.name > b.name) {
                        return -1
                    }

                    return 0
                })
            } else if (action.payload === "az") {
                state.orderAlpha = "A - Z"
                state.usersFilter =  [...state.usersFilter].sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    } 

                    if (a.name > b.name) {
                        return 1
                    }

                    return 0
                })
               
            } else {
                state.orderAlpha = "Z - A"
                state.usersFilter = [ ...state.usersFilter].sort((a, b) => {
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
        .addCase(fetchingUsersReal.fulfilled, (state:InitialStateRealUser, action) => {

            const arrOrdered = [...action.payload].sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                } 

                if (a.name > b.name) {
                    return 1
                }

                return 0
            })
            state.usersReal = arrOrdered
            state.usersRealCopy = arrOrdered
            if (state.usersFilter.length === 0) state.usersFilter = arrOrdered

            
           /*  state.usersRealCopy = action.payload */
        })
        .addCase(updatingUsersReal.fulfilled, (state, action) => {
            state.userUpdated = action.payload
        })
        .addCase(getallUsersReal.fulfilled, (state, action) => {
            console.log(action.payload)
            state.usersDeleted = action.payload 
            state.usersDeletedCopy = action.payload
        })
        .addCase(activeUsersReal.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const { nameEdit, searchByName, filterByStatus, orderAlpha } = usersRealSlice.actions;
/* export const selectAllUsersReal = (state: MainGlobal): User[] => state.usersReal.allUsers */
export default usersRealSlice;