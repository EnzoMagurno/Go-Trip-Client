'use client';
import React, { useEffect, useState } from 'react';
import NavBarFooter from '../components/navBarFooter/NavBarFooter';
import SearchBar from '../components/SearchBar/SearchBar';
import SliderMain from '../components/SlidersImages/SliderMain';
import FiltersBar from '../components/Filters/FiltersBar';
import ContainerResults from '../components/ContainerResults/ContainersResults';
import {
	fetchingCities,
	fetchingCity,
	selectCityState,
} from '../redux/Features/Citys/CitySlice';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchingHotel,
	selectHotelState,
} from '../redux/Features/Hotel/hotelsSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';


import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';

	
const Home = () => {
	const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
	const cityResults = useSelector(selectCityState);
	const hotelResults = useSelector(selectHotelState);

	const [tokenSession, setTokenSession] = useLocalStorage<string>('token', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');

	const storedUserNameSession = localStorage.getItem('username');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedUserNameSession;
			setUserNameSession(
				storedUserNameSession ? JSON.parse(storedUserNameSession) : ''
			);
		}
	}, [typeof window !== 'undefined' && storedUserNameSession]);

	useEffect(() => {

		dispatch(fetchingHotel());
	}, []);

	return (
		<div className={`p-5 pb-24 dark:bg-neutral-900`}>
			<header className='pt-2 pb-2 '>
				<h4 className={`  text-gray-500 dark:text-blueSky`}>
					{userNameSession !== '' ? userNameSession : 'Hello, User'}
				</h4>
				<h3 className={`text-3xl dark:text-white`}>
					Where We Go?
				</h3>

				<FiltersBar />
			</header>

			<main>
				<SliderMain />
			</main>

			<footer className=' bg-slate-600'></footer>
		</div>
	);
};

export default Home;
