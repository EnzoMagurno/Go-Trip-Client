import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainGlobal } from "../../mainInterface";
import axios from "../../../utils/axios";



export const fetchingUsersReal = createAsyncThunk("getUsersReal", async () => {
        const response = await axios.get("/User/readUser/");
      return response.data;
    })



export interface User { 
    id: string,
    name: string,
    // avatar: string
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
        usersRealCopy: [],
        status: "idle",
        error: null
    },
    reducers: {
        nameEdit: (state, action) => {



            // const reverseData = [ ...state.users ].sort((a: User, b: User) => b.id - a.id)

            // state.usersCopy = reverseData;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchingUsersReal.pending, (state: InitialStateRealUser, action) => {
            state.status = "pending"
        })
        .addCase(fetchingUsersReal.fulfilled, (state:InitialStateRealUser, action) => {

            state.usersReal = action.payload
            state.usersRealCopy = action.payload
        })
        .addCase(fetchingUsersReal.rejected, (state: InitialStateRealUser, action) => {
            state.error = action.error.message || null
        })
    }
})

export const { nameEdit } = usersRealSlice.actions;
export const selectAllUsersReal = (state: MainGlobal): User[] => state.usersReal.usersRealCopy
export default usersRealSlice;