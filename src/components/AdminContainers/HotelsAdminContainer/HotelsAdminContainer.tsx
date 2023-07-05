import { AiOutlineDelete, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { BsSave } from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteHotel,
	fetchingHotel,
	updateHotel,
} from '../../../redux/Features/Hotel/hotelsSlice';
const AdminContainer = (props) => {
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

	const dispatch = useDispatch();

	const inputHandleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputChecUpdated({
			...inputsUpdated,
			[name]: value,
		});
	};

	const dispatchUpdate = () => {
		dispatch(updateHotel(inputsUpdated));
		dispatch(fetchingHotel());
		setInputCheck('hidden');
		setInputPhone('hidden');
		setInputEmail('hidden');
	};

	const deleteHotelHandler = () => {
		dispatch(deleteHotel(id));
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
			<div className='p-2'>
				<div className='grid grid-cols-2'>
					<div>
						<h6 className=' font-medium mb-2'>Ubicacion</h6>
						<p>
							{destination.country}, {destination.state}
							{destination.state ? ',' : ''} {destination.city}
						</p>
						<p>{address}</p>
					</div>
					<div className=' overflow-auto'>
						<h6 className='font-medium mb-2 '>Contacto</h6>
						<p className=' '>{email}</p>
						<p>{phone}</p>
					</div>
				</div>

				<div className='mt-3'>
				<h6 className=' font-medium mb-2'>Gallery</h6>
				<div className='flex p-2 border border-zinc-100 rounded-lg '>
					<div className='w-20 h-20 mr-1 bg-zinc-100 rounded-xl'></div>
					<div className='w-20 h-20 ml-1 bg-zinc-100 rounded-xl'></div>
				</div>
				</div>
				
				<h6 className='font-medium'>Description</h6>
				<p className='h-40 overflow-auto'>{overview}</p>
			</div>
		</div>
	);
};

export default AdminContainer;
