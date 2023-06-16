
import React from 'react';
import { Josefin_Sans, Roboto } from 'next/font/google';
import SliderHotels from "../components/SlidersImages/SliderHotels"
import NavBarFooter from '@/components/navBarFooter/NavBarFooter';
import SearchBar from "../components/SearchBar/SearchBar"

const josefin = Josefin_Sans({
  weight: ['400'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: '700',
  subsets: ['cyrillic'],
});

const Home = () => {
	return (
		<div className={`p-5`}>
			<div className='pt-2 pb-2 mt-12'>
				<h4 className={`${josefin.className}  text-gray-500`}>Hello, User</h4>
				<h3 className={`${roboto.className} text-3xl`}>Where We Go?</h3>
			</div>
      <SearchBar />
      
      <main>
        <SliderHotels roboto={roboto} />
      </main>

      <footer className=' bg-slate-600'>
           <NavBarFooter />
      </footer>
 
		</div>
	);
  }


export default Home;
