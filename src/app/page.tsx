
import React from 'react';
import { Josefin_Sans, Roboto } from 'next/font/google';
import SliderHotels from "../components/SlidersImages/SliderHotels"
import NavBarFooter from '@/components/navBarFooter/NavBarFooter';
import SearchBar from "../components/SearchBar/SearchBar";
import SliderHotDeals from "../components/SlidersImages/SliderHotDeals";
import HotSaleSlider from "../components/SlidersImages/HotSaleSlider";
import FiltersBar from "../components/Filters/FiltersBar";
import NavBar from "../components/NavBarTop/NavBarTop";
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
    <div className={`p-5 pb-24 dark:bg-neutral-900`}>
      <NavBar />
      <div className='pt-2 pb-2 mt-20'>
        <h4 className={`${josefin.className}  text-gray-500 dark:text-blueSky`}>Hello, User</h4>
        <h3 className={`${roboto.className} text-3xl dark:text-white`}>Where We Go?</h3>
      </div>
      <SearchBar />
      <FiltersBar />

      <main>
        <SliderHotels roboto={roboto} />
        <SliderHotDeals roboto={roboto} />
        <HotSaleSlider roboto={roboto} />
      </main>

      <footer className=' bg-slate-600'>
        <NavBarFooter />
      </footer>

    </div>
  );
}


export default Home;