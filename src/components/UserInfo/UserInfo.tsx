"use client"
import { fetchUsers } from '@/redux/Features/allUsers';
import React from 'react';
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';

function UserInfo() {

	const dispatch = useDispatch()

	const users = useSelector(state => state.user.users)
	useEffect(() => {
		dispatch(fetchUsers())
		console.log(users)
	}, [users.length])
	return (
		<div>
			
		</div>
	);
}

export default UserInfo;
