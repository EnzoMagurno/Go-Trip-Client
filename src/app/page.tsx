import Image from 'next/image';
import React from 'react';
import SearchBar from "../components/SearchBar/SearchBar"
import { Josefin_Sans, Roboto } from 'next/font/google';

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
		<div className='p-5'>
			<div className='pt-2 pb-2 mt-12'>
				<h4 className={`${josefin.className}  text-gray-500`}>Hello, User</h4>
				<h3 className={`${roboto.className} text-3xl`}>Where We Go?</h3>
			</div>
      <SearchBar />
      
		</div>
	);
};

export default Home;
