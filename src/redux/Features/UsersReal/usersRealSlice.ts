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
        usersDeleted: [],
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
        .addCase(fetchingUsersReal.fulfilled, (state:InitialStateRealUser, action) => {

            state.usersReal = action.payload
           /*  state.usersRealCopy = action.payload */
        })
        .addCase(updatingUsersReal.fulfilled, (state, action) => {
            state.userUpdated = action.payload
        })
        .addCase(getallUsersReal.fulfilled, (state, action) => {
            console.log(action.payload)
            state.usersDeleted = action.payload 
        })
        .addCase(activeUsersReal.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const { nameEdit } = usersRealSlice.actions;
/* export const selectAllUsersReal = (state: MainGlobal): User[] => state.usersReal.allUsers */
export default usersRealSlice;