'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchingHotel,
	
} from '../../../redux/Features/Hotel/hotelsSlice';
import ActiveUsers from '../../../components/AdminContainers/UsersAdminContainer/ActiveUsers';
import UsersDeleted from '../../../components/AdminContainers/UsersAdminContainer/UsersDeleted';
import FiltersUsers from '../../../components/SearchBarUsers/SearchBarUsers';
import { FiUserX, FiUserCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { BsSave } from "react-icons/bs";
import HotelsAdminContainer from "../../../components/AdminContainers/HotelsAdminContainer/HotelsAdminContainer";

const AllHotelsHost = () => {
	const dispatch = useDispatch();

	const hotels = useSelector((state) => state.hotel.hotelData);
    const hotelData = useSelector((state) => state.hotel.hotel);

	
	
	useEffect(() => {
		dispatch(fetchingHotel());
		console.log(hotels);
	}, [hotels.length, hotelData]);

		return (
			<div className='p-5 pb-24'>


				 <FiltersUsers
					optionDefault={"filterBy"}
					optionOrderDefault={"orderAlpha"}
				/> 

				{
				hotels.map(hotel => <HotelsAdminContainer 
					address={hotel.address}
					checkIn={hotel.checkIn}
					checkOut={hotel.checkOut}
					createdAt={hotel.createdAt}
					deletedAt={hotel.deletedAt}
					destination={hotel.destination}
					destinationId={hotel.destinationId}
					email={hotel.email}
					gallery={hotel.gallery}
					id={hotel.id}
					image={hotel.image}
					latitude={hotel.latitude}
					longitude={hotel.longitude}
					name={hotel.name}
					numberRooms={hotel.numberRooms}
					overview={hotel.overview}
					phone={hotel.phone}
					rooms={hotel.rooms}
					status={hotel.status}
					updatedAt={hotel.updatedAt}
					/>
				)}
				
			
			</div>
		);
	} 

export default AllHotelsHost;





/* 'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingHotel } from '../../../redux/Features/Hotel/hotelsSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { BsSave } from "react-icons/bs";
import HotelsAdminContainer from "../../../components/AdminContainers/HotelsAdminContainer";
const AllHotelsAdmin = () => {
	const dispatch = useDispatch();
	const hotels = useSelector((state) => state.hotel.hotelData);
    const hotelData = useSelector((state) => state.hotel.hotel);
	

	

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

export default AllHotelsAdmin; */
