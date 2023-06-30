"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { City } from '../../redux/Features/Citys/CitySlice';
import { getHotelsCoincidence } from "../../redux/Features/Hotel/hotelsSlice";
import { fetchingCity } from "../../redux/Features/Citys/CitySlice";
import { MainGlobal } from '@/redux/mainInterface';


export interface Font {
    className: string
}

export interface Fonts {
    roboto: Font
}

const SliderHotels: React.FC<Fonts> = ({ roboto }) => {

	const cityResults: City[] = useSelector((state: MainGlobal) => state.city.dataCity);
	const citiesCopy = cityResults.slice(); 

	const dispatch = useDispatch()


	useEffect(() => {
    
    
		dispatch(fetchingCity())
	},[])

	

	const citiesSort = citiesCopy.sort((a,b) => 
		b.hotel.length - a.hotel.length
	)

	const firstTenCities = citiesSort.slice(0, 10);

	

	return (

		<div className='flex overflow-x-auto flex-wrap h-60 my-3 '>
		  <div className="flex flex-row gap-5 my-3">
			{firstTenCities && firstTenCities?.map((city: City)=>{
				return (

			<button onClick={() => { dispatch(getHotelsCoincidence(city.id))}}className='w-36 relative shadow-img rounded-3xl'>
                <div className=' bg-gradient-to-t from-black via-transparent absolute z-10 w-full h-full opacity-30 rounded-3xl'></div>
                    <img
					src={city.hotel[0].image}
					alt={city.city}
					className={`w-full h-full object-cover rounded-r-3xl rounded-l-3xl `}
				/>
				<div className='absolute bottom-0 text-white left-3 pb-3 z-30'>
					<h2 className={`${roboto.className}`}>{city.city}</h2>
					<p className='text-little'>{city.hotel.length} properties</p>
				</div>
                </button>
				)
			})}
				
			</div>
		</div>
	);
};

export default SliderHotels;
