'use client';
import React, { useEffect, useState } from 'react';
import { Bad_Script, Courgette, Josefin_Sans, Roboto } from 'next/font/google';
import NavBarFooter from '@/components/navBarFooter/NavBarFooter';
import SearchBar from '../components/SearchBar/SearchBar';
import SliderMain from '../components/SlidersImages/SliderMain';
import FiltersBar from '../components/Filters/FiltersBar';
import ContainerResults from '../components/ContainerResults/ContainersResults';
import { useLocalStorage } from '../hooks/useLocalStorage';

import {
	fetchingCity,
	selectCityState,
} from '../redux/Features/Citys/CitySlice';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchingHotel,
	selectHotelState,
} from '../redux/Features/Hotel/hotelsSlice';
import { useRouter } from 'next/navigation';

const josefin = Josefin_Sans({
	weight: ['400'],
	subsets: ['latin'],
});

export const badScript = Bad_Script({
	weight: ['400'],
	subsets: ['latin'],
});

export const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['cyrillic'],
});

const Home = () => {
	const dispatch = useDispatch();
	const cityResults = useSelector(selectCityState);
	const hotelResults = useSelector(selectHotelState);
	const router = useRouter();

useEffect(() => {


    dispatch(fetchingHotel())


  }, [])


	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');

	useEffect(() => {
		localStorage.getItem('token');
		localStorage.getItem('username');
	}, [userNameSession]); //! MANTENER CODE


	console.log(userNameSession); 

return (
		<div className={`p-5 pb-24 dark:bg-neutral-900`}>

      <header className='pt-2 pb-2 '>
        <h4 className={`${josefin.className}  text-gray-500 dark:text-blueSky`}>
        					{/* MANTENER CODE */}
					{tokenSession ? userNameSession : 'Hello, User'}
        </h4>
        <h3 className={`${roboto.className} text-3xl dark:text-white`}>Where We Go?</h3>
        
        
          <FiltersBar />

          

        
      </header>

     

      <main>
            <SliderMain roboto={roboto}/>

       
      </main>

      <footer className=' bg-slate-600'>
        
      </footer>

    </div>
  );
}


export default Home;
