'use client';
import React, { useEffect, useState } from 'react';
import { Bad_Script, Courgette, Josefin_Sans, Roboto } from 'next/font/google';
import NavBarFooter from '@/components/navBarFooter/NavBarFooter';
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

const josefin = Josefin_Sans({
	weight: ['400'],
	subsets: ['latin'],
});

const badScript = Bad_Script({
	weight: ['400'],
	subsets: ['latin'],
});

 const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['cyrillic'],
});

const Home = () => {
	const dispatch = useDispatch();
	const cityResults = useSelector(selectCityState);
	const hotelResults = useSelector(selectHotelState);

	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
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
		console.log(tokenSession)
		dispatch(fetchingHotel(tokenSession));
	}, []);

	return (
		<div className={`p-5 pb-24 dark:bg-neutral-900`}>
			<header className='pt-2 pb-2 '>
				<h4 className={`${josefin.className}  text-gray-500 dark:text-blueSky`}>
					{userNameSession !== '' ? userNameSession : 'Hello, User'}
				</h4>
				<h3 className={`${roboto.className} text-3xl dark:text-white`}>
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
