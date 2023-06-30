'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingHotel } from '../../../redux/Features/Hotel/hotelsSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { BsSave } from "react-icons/bs";
import HotelsAdminContainer from "../../../components/HotelsAdminContainer/HotelsAdminContainer";
const AllHotelsAdmin = () => {
	const dispatch = useDispatch();
	const hotels = useSelector((state) => state.hotel.hotelData);
    const hotelData = useSelector((state) => state.hotel.hotel);
	

	useEffect(() => {
		dispatch(fetchingHotel());
		console.log(hotels);
	}, [hotels.length, hotelData]);

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};








	return (
		<div className='p-5 pb-24'>
			<div>
				<h1>Hotels</h1>

				{hotels.map((hotel) => <HotelsAdminContainer 
                key={hotel.id}
                id={hotel.id}
                email={hotel.email}
                image={hotel.image}
                phone={hotel.phone}
                name={hotel.name} 
                checkIn={hotel.checkIn}
                checkOut={hotel.checkOut}
                city={hotel.destination.city}
                state={hotel.destination.state}
                country={hotel.destination.country}

                />
				)}
			</div>
		</div>
	);
};

export default AllHotelsAdmin;
