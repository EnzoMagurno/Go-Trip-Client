"use client"
import React from 'react'
import axios from '@/utils/axios'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsCoincidencesByCityId } from '@/redux/Features/Citys/CitySlice';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useRouter } from 'next/navigation';
import { fetchinCommentByHotel } from '@/redux/Features/Commets/CommentsSlice';
import StarRating from '@/components/StarRaiting/StarRaiting';
import { useLocalStorage } from '@/hooks/useLocalStorage';


import { Fonts } from './SliderHotels';

const SliderHotDeals: React.FC<Fonts> =  () => {

	const [response, setResponse] = useState(null);
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');


	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get('/hotel/findhotel/?destinationId=5ce1ce9c-ceda-4666-8c72-0f4ec34a21fe', {
			  headers: {
				Authorization: `Bearer ${tokenSession}`
			  }
			});
			setResponse(response.data)
		  } catch (error) {
			console.error('Error en la petición:', error);
		  }

		};
		if (typeof document !== 'undefined') {
			// El código que accede al objeto document solo se ejecuta en el navegador
			const swiper = new Swiper('.swiper-container', {
				// Configuración del carrusel
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				autoplay: {
					delay: 3000, // Intervalo de tiempo entre cada slide (en milisegundos)
					disableOnInteraction: false, // Permite la reproducción automática incluso cuando el usuario interactúa con el carrusel
				},
			})
		};

		fetchData();
	}, []);


	const hoteles = response ? response : [];

 



  return (
	<div className=' mt-3 mb-3 overflow-hidden'>
	<h2 className={`text-subTitle mb-3`}>Hot Deals</h2>
    <div className="swiper-container ">
      <div className="swiper-wrapper">
        {/* Agrega tus divs del carrusel aquí */}
		{hoteles && hoteles.map(hotel => 
			<button 
			key={hotel.id}
			onClick={() => {
				router.push(`/detail/${hotel.id}`);
			}} className="swiper-slide">
				
			<div className='h-56 relative'>
					<div className='absolute bottom-0 text-white w-full pl-3 pr-3 h-12 '>
						<div className='bg-slate-600 w-full h-full left-0 opacity-50 absolute rounded-bl-3xl rounded-br-3xl'></div>
						<div className='flex justify-between'>
							<h2 className={`relative z-10 flex justify-center items-center`}>{hotel.name}</h2>
							<h2 className={` text-little relative text-base z-50 flex justify-center items-center`} >$250</h2>
						</div>
						<div className='flex justify-between'>
							<p className={`text-little relative z-10 flex justify-center items-center `}>{hotel.city}</p>
	
							<p className='text-little relative z-10 flex justify-center items-center'>per night</p>
						</div>
					</div>
					<img
						src={hotel.image}
						alt='cabos'
						className=' rounded-3xl h-full w-full object-cover shadow-img'
					/>
				</div>
			</button>
			)}
        
       
        
      </div>


			</div>
		</div>
	);
};

export default SliderHotDeals;