'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
	selectOriginalHotelState,
	fetchingHotel,
} from '../../redux/Features/Hotel/hotelsSlice';
import { useEffect } from 'react';
import CardHotelHoteiler from '../../components/CardHotelHoteiler/CardHotelHoteiler';

export interface MyHotel {
	address: string
		checkIn: string
		checkOut: string
		destination: string
		destinationId: string
		email: string
		id: string
		image: string
		latitude: string
		phone: string
		longitude: string
		name: string
		numberRooms: number
		overview: string
		rooms: []
		status: boolean
		gallery: []
}

const MyHotels = () => {
	const hotels = useSelector(selectOriginalHotelState);

	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(fetchingHotel());
	}, [hotels.length]);

	return (
		<div className=' p-5 pb-24'>
			<div className='grid grid-cols-1 gap-5'>
				{hotels.map((hotel: MyHotel) => (
					<CardHotelHoteiler 
					key={hotel.id}
                    id={hotel.id}
                    name={hotel.name} 
                    image={hotel.image}
                     />
				))}
			</div>
		</div>
	);
};

export default MyHotels;
