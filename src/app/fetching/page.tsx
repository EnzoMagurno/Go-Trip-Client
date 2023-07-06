"use client"
import { fetchingUsers, selectAllUsers, sortReverseData, User } from "../../redux/Features/Users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from '@reduxjs/toolkit'; 
import { RootState } from '@/redux/store'; 
import {  AnyAction } from "@reduxjs/toolkit"



const Fetching = () => {
    
    const allUsers = useSelector(selectAllUsers)
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

    return (
        <div>
            Fetching Data
            <div>
                <button onClick={() => dispatch(fetchingUsers())}>Get All Users</button>
                <button onClick={() => dispatch(sortReverseData())} >Sort Users</button>


                <ul>
                    {
                        allUsers.map((user: User) => {
                            return (
                                <li>
                                <div>
                                    <h3>{user.id}</h3>
                                    <h3>{user.first_name}</h3>
                                    <p>{user.email}</p>
                                    <img src={user.avatar} alt="" 
                                    className="w-10 h-10 rounded-full"
                                    />
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Fetching;