import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchUsers = createAsyncThunk("allUsers", async () => {

    return await fetch("https://gotrippf-production.up.railway.app/user/readUser", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA1ZWRiYS0yYWEzLTQ5ODAtYjg2NS05NWU3NDg0NDgzZmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODc5MjMzMzcsImV4cCI6MTY4NzkzMDUzN30.Ojmdyqp2WCXcttVwJYRd84Lxz0LjXytOcgjuC6jxVNo',
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
});



const userSlice = createSlice({
    name: "user",
    initialState: {
        users: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            console.log("hola mundo")
            
        })
    }
}) 



export default userSlice;

/* export const {} = userSlice.actions */




