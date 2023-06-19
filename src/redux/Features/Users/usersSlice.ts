import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainGlobal } from "../../mainInterface";



export const fetchingUsers = createAsyncThunk("getUsers", async () => {
    return await fetch("https://reqres.in/api/users")
    .then(response => response.json())
    .then(data => {
        return data.data
    })
})




export interface User { 
    id: number
    first_name: string
    email: string
    avatar: string
 }

export interface InitialStateUser {
    users: User[]
    usersCopy: User[]
    status: string
    error: string | null
 }





const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        usersCopy: [],
        status: "idl",
        error: null
    },
    reducers: {
        sortReverseData: (state) => {

            const reverseData = [ ...state.users ].sort((a: User, b: User) => b.id - a.id)

            state.usersCopy = reverseData;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchingUsers.pending, (state, action) => {
            state.status = "pending"
        })
        .addCase(fetchingUsers.fulfilled, (state, action) => {

            state.users = action.payload
            state.usersCopy = action.payload
        })
        .addCase(fetchingUsers.rejected, (state: InitialStateUser, action) => {
            state.error = action.error.message || null
        })
    }
})

export const { sortReverseData } = usersSlice.actions;
export const selectAllUsers = (state: MainGlobal): User[] => state.users.usersCopy
export default usersSlice;