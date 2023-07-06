import { AiOutlineDelete } from 'react-icons/ai';

import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteHotel,
	fetchingHotel,
} from "../../../redux/Features/Hotel/hotelsSlice";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { GrDirections } from "react-icons/gr";
import { GiModernCity, GiDirectionSigns } from "react-icons/gi" 
import { motion } from 'framer-motion';
import { ThunkDispatch } from '@reduxjs/toolkit'; 
import { RootState } from '@/redux/store'; 
import {  AnyAction } from "@reduxjs/toolkit"


const AdminContainer = (props: any) => {
	const {
		id,
		address,
		checkIn,
		checkOut,
		createdAt,
		deletedAt,
		destination,
		destinationId,
		email,
		gallery,
		image,
		latitude,
		longitude,
		name,
		numberRooms,
		overview,
		phone,
		rooms,
		status,
		updatedAt,
	} = props;

	const [inputCheck, setInputCheck] = useState('hidden');
	const [inputPhone, setInputPhone] = useState('hidden');
	const [inputEmail, setInputEmail] = useState('hidden');

	const [inputsUpdated, setInputChecUpdated] = useState({
		id: id,
		checkIn: checkIn,
		checkOut: checkOut,
		email: email,
		phone: phone,
	});
	
	const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
	


	const deleteHotelHandler = () => {
		dispatch(deleteHotel(id));
		dispatch(fetchingHotel());
		
	};


	const [ isPressed, setIsPressed ] = useState(false)
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen(!isOpen);
		setIsPressed(!isPressed);
	};


	return (
		<div className='relative text-sm shadow-buttonAdd rounded-3xl mt-5 mb-5 '>
			<div className='absolute w-full h-60 bg-opacity-40 rounded-3xl rounded-b-none bg-gray-600'></div>
			<img
				src={image}
				alt={name}
				className=' w-full  h-60 m-auto rounded-3xl rounded-b-none  object-cover'
			/>
			<h5 className='absolute w-full text-white top-5 text-center font-bold text-2xl '>
				{name}
			</h5>
			<div className='flex p-2 items-center'>
				<h6 className='font-medium w-2/5 '>Status</h6>
				<div className=' w-full flex items-center '>
				<label
								htmlFor={id}
								className='relative shadow-inset_custom  w-14 h-8 cursor-pointer rounded-full inline-block  dark:shadow-inset_BlueSky '
								onChange={deleteHotelHandler}
							>
								<input type='checkbox' id={id} className=' sr-only peer' />
								<span className='w-6 h-6 top-1 peer-checked:left-1 peer-checked:bg-zinc-600 absolute rounded-full bg-green-600   left-7 transition-all duration-300'></span>
							</label>
				</div>
				
			</div>
			<div className='flex p-2 items-center'>
				<h6 className=' font-medium w-2/5'>Delete hotel</h6>
				<button
				onClick={deleteHotelHandler}
				className=' bg-red-600 w-full h-8 text-white flex justify-center items-center  rounded-md'>Delete <AiOutlineDelete className='text-lg inline ml-2' /></button>
			</div>
		
			
			<motion.div
						initial={{ height: 0 }}
						animate={{ height: isOpen ? 'auto' : 0 }}
						transition={{ duration: 0.3 }}
						className='overflow-hidden p-2'
					>
			<div className={`p-2  ${isOpen ? "border-2" : ""} border-zinc-100`}>
				<div className='grid grid-cols-2'>
					<div className='p-2'>
						<h6 className=' font-medium mb-2'>Ubicacion</h6>
						<p className=' text-xs mb-2'>
						<GiModernCity className='text-xl text-iconsPurple' />
							{destination.country}, {destination.state}
							{destination.state ? ',' : ''} {destination.city}
						</p>
						<p className=' text-xs'><GiDirectionSigns className='text-xl text-iconsPurple'/>{address}</p>
					</div >
					<div className=' overflow-auto p-2'>
						<h6 className='font-medium mb-2 '>Contacto</h6>
						<p className=' text-xs mb-2'><MdOutlineEmail  className='text-xl text-iconsPurple' />{email}</p>
						<p className='text-xs'><BsTelephone className='text-xl text-iconsPurple' />{phone}</p>
					</div>
				</div>

				<div className='mt-3'>
				<h6 className=' font-medium mb-2'>Gallery</h6>
				<div className='flex p-2 border border-zinc-100 rounded-lg '>
					<div className='w-20 h-20 mr-1 bg-zinc-100 rounded-xl'></div>
					<div className='w-20 h-20 ml-1 bg-zinc-100 rounded-xl'></div>
				</div>
				</div>
				
				<h6 className='font-medium mb-2 mt-2'>Description</h6>
				<p className='h-40 overflow-auto text-xs'>{overview}</p>
			</div>
			</motion.div>
			<div className='w-full cursor-pointer  flex items-center justify-center h-10'
			onClick={toggleOpen}
		

			>
			<BsChevronDown className={` text-cyan-900 text-lg transition-transform duration-300  ${isPressed ? "transform rotate-180" : "transform rotate-0"}`} />
			</div>
		</div>
	);
};

export default AdminContainer;
