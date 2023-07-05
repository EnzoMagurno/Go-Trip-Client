'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchingHotel,
	getDeletedHotels,
} from '../../../redux/Features/Hotel/hotelsSlice';
import FiltersHotels from '../../../components/SelectHotelsHost/FiltersHotelHost';
import HotelsAdminContainer from '../../../components/AdminContainers/HotelsAdminContainer/HotelsAdminContainer';
import HotelsDisabledContainer from '../../../components/AdminContainers/HotelsAdminContainer/HotelsDisabledContainer';
import { TbMoodHappy } from "react-icons/tb"
const AllHotelsHost = () => {
	const dispatch = useDispatch();

	const {
		copyHotelData,
		copyHotelsDeleted,
		filterHotelStatus,
		orderAlpha,
		hotelsDeleted,
		hotelData,
		responseSuccesfull,
	} = useSelector((state) => state.hotel);

	useEffect(() => {
		dispatch(fetchingHotel());
		dispatch(getDeletedHotels());
	}, [
		responseSuccesfull,
		filterHotelStatus,
		hotelsDeleted.length,
		hotelData.length,
	]);

	return (
		<div className='p-3 pb-24'>
			<FiltersHotels
				optionDefault={filterHotelStatus}
				optionOrderDefault={orderAlpha}
			/>


{!copyHotelData.length  && !copyHotelsDeleted.length && filterHotelStatus === "Active hotels"? ( 
				<div className="relative flex items-center text-iconsPurple justify-center ">
				<span className='absolute text-ms'>loading</span>
				<div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-iconsPurple"></div>
			  </div>
) : (
				<></>
			)} 
			{copyHotelData.map((hotel) => (
				<HotelsAdminContainer
					key={hotel.id}
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
			))}

			{!copyHotelsDeleted.length  && !copyHotelData.length && filterHotelStatus === "Disabled hotels"? (
			<div>
				<h5 className='text-lg font-bold text-center'>There are no disabled hotels</h5>
				<TbMoodHappy  className='text-3xl m-auto text-yellow-500'/>
			</div>	
			) : (
				<></>
			)}
			{copyHotelsDeleted?.map((hotel) => (
				<HotelsDisabledContainer
					key={hotel.id}
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
			))}
		</div>
	);
};

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
