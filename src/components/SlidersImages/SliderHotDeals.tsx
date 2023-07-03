"use client"
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


import Swiper, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';

import { Fonts } from './SliderHotels';

const SliderHotDeals: React.FC<Fonts> =  ({ roboto }) => {

	const [response, setResponse] = useState(null);

	const hoteles = []

	

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
	
			const response = await axios.get('https://gotrippf-production.up.railway.app/destination?country=Mexico', {
			  headers: {
				Authorization: `Bearer ${token}`
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
		})};
	
		fetchData();
	  }, []);

		
	  const ciudades = response ? response : [];


		ciudades.map((ciudad) => ciudad.hotel[0]? hoteles.push(ciudad.hotel[0]): hoteles.push() )
		console.log(hoteles);

		const newArray = hoteles.map((hotel) => {
			const obj1 = ciudades.find((item) => item.id === hotel.destinationId);
			

			return {
			  ...hotel,
			  city: obj1.city ? obj1.city : null,
			};
		  });

		  console.log(newArray);
		  
 
  useEffect(() => {
	

  }, []);

  return (
	<div className=' mt-3 mb-3'>
	<h2 className={`${roboto.className} text-subTitle mb-3`}>Hot Deals</h2>
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {/* Agrega tus divs del carrusel aquí */}
		{newArray && newArray?.map(hotel => 
			<div className="swiper-slide">
			<div className='h-56 relative'>
					<div className='absolute bottom-0 text-white w-full pl-3 pr-3 h-12 '>
						<div className='bg-slate-600 w-full h-full left-0 opacity-50 absolute rounded-bl-3xl rounded-br-3xl'></div>
						<div className='flex justify-between'>
							<h2 className={`${roboto.className} relative z-10 flex justify-center items-center`}>{hotel.city}</h2>
							<h2 className={`${roboto.className} text-little relative text-base z-50 flex justify-center items-center`} >$250</h2>
						</div>
						<div className='flex justify-between'>
							<p className={`text-little relative z-10 flex justify-center items-center `}>Mexico</p>
	
							<p className='text-little relative z-10 flex justify-center items-center'>per night</p>
						</div>
					</div>
					<img
						src={hotel.image}
						alt='cabos'
						className=' rounded-3xl h-full w-full object-cover shadow-img'
					/>
				</div>
			</div>
			)}
        
       
        
      </div>

      
    </div>
	</div>
  );
};

export default SliderHotDeals;