"use client"
import React, { useEffect } from 'react';
import { Josefin_Sans, Roboto } from 'next/font/google';
import NavBarFooter from '@/components/navBarFooter/NavBarFooter';
import SearchBar from "../components/SearchBar/SearchBar";
import SliderMain from "../components/SlidersImages/SliderMain";
import FiltersBar from "../components/Filters/FiltersBar";
import NavBar from "../components/NavBarTop/NavBarTop";
import ContainerResults from "../components/ContainerResults/ContainersResults";
import { useSelector } from 'react-redux';
import { selectHotelState } from '@/redux/Features/Hotel/hotelsSlice';
const josefin = Josefin_Sans({
  weight: ['400'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: '700',
  subsets: ['cyrillic'],
});

const Home = () => {

  const hotels = useSelector(selectHotelState)

  useEffect(() => {

  }, [hotels.length])


	return (
		<div className={`p-5 pb-24 dark:bg-neutral-900`}>
      <NavBar />
			<div className='pt-2 pb-2 mt-20'>
				<h4 className={`${josefin.className}  text-gray-500 dark:text-blueSky`}>Hello, User</h4>
				<h3 className={`${roboto.className} text-3xl dark:text-white`}>Where We Go?</h3>
			</div>
      <SearchBar />
      <FiltersBar />
      
      <main>
        {
          hotels.length 
          ? <ContainerResults roboto={roboto} />
          :  <SliderMain roboto={roboto}/>
        }
       
        
      </main>

      <footer className=' bg-slate-600'>
           <NavBarFooter />
      </footer>
 
		</div>
	);
  }


export default Home;
