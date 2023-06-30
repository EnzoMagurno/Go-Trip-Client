'use client';

import { TbEdit } from 'react-icons/tb';
import { BiDirections } from 'react-icons/bi';
import { AiOutlineMail, AiOutlinePhone, AiOutlineBell } from 'react-icons/ai';
import { MdOutlineBedroomChild } from 'react-icons/md';
import { roboto, badScript } from '../../app/page';
import { CiLocationOn } from 'react-icons/ci';
import { useState } from 'react';
import { MyHotel } from '../../app/myHotels/page';
import { editDataHandler, activateEdit } from './utils/settingsUtils';
import { CiSaveDown2 } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import {
	updateHotel,
	fetchinHotelId,
} from '../../redux/Features/Hotel/hotelsSlice';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface HotelProps {
	hotel: MyHotel;
}

const SettingsHotel = ({ hotel }: HotelProps) => {
	const {
		address,
		checkIn,
		checkOut,
		destination,
		destinationId,
		email,
		id,
		image,
		latitude,
		phone,
		longitude,
		name,
		numberRooms,
		overview,
		rooms,
		status,
	} = hotel;

	
	const dispatch = useDispatch();

	const [editData, setEditData] = useState({
		name: '',
		email: '',
		phone: '',
		checkIn: '',
		checkOut: '',
		overview: '',
		image: '',
	});

	const [emailInputDisabled, setEmailEdit] = useState('hidden');
	const [phoneInputDisabled, setPhoneEdit] = useState('hidden');
	const [checkInputDisabled, setCheckEdit] = useState('hidden');
	const [ descriptionInputDisabled, setDescriptionEdit] = useState('hidden');

	return (
		<div className={`${roboto.className}`}>
			<h5
				className={`${badScript.className} text-center p-3 font-bold text-2xl`}
			>
				{name}
			</h5>

			<img
				src={image}
				alt={name}
				className=' w-full h-52 object-cover rounded-2xl shadow-img'
			/>

			<table className=' w-full rounded-2xl mt-3'>
				<tbody className='h-10 '>
					<tr className='h-10  '>
						<td className=' w-full h-14 text-2xl text-iconsPurple  flex justify-center items-center'>
							<div className='flex flex-wrap justify-center items-center '>
								<AiOutlineMail className=' w-full' />
								<h5 className=' text-xs w-full text-center'>Email</h5>
							</div>
						</td>
						<td className=' w-3/4 text-sm text-center '>
							<h5 className='relative inline-block w-40'>
								{email}
								<button
									/* onClick={} */ className='text-2xl absolute -top-2 -right-8 text-blueSky'
								>
									<TbEdit
										onClick={() =>
											activateEdit(emailInputDisabled, setEmailEdit)
										}
									/>
								</button>
								<div
									className={`absolute top-0 -left-16 ${emailInputDisabled}  w-64 h-10`}
								>
									<input
										type='text'
										name='email'
										value={editData.email}
										onChange={(event) =>
											editDataHandler(event, editData, setEditData)
										}
										className='shadow-img w-full z-20 h-full rounded-lg pl-2'
									/>
									<div className='absolute z-20 top-0 right-0 bg-white w-10 h-full rounded-lg flex justify-center items-center '>
										<CiSaveDown2
											onClick={() => {
												dispatch(updateHotel({ id, email: editData.email }));
												dispatch(fetchinHotelId(id));
												setEmailEdit('hidden');
											}}
											className=' text-iconsPurple w-7 h-7 text-xl '
										/>
									</div>
									<div className='absolute bg-white rounded-full shadow-buttonAdd -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<AiOutlineCloseCircle
											onClick={() => setEmailEdit('hidden')}
											className=' text-3xl text-red-400'
										/>
									</div>
								</div>
							</h5>
						</td>
					</tr>

					<tr className='h-10 '>
						<td className=' w-full h-14 text-2xl text-iconsPurple  flex justify-center items-center'>
							<div className='flex flex-wrap justify-center items-center'>
								<AiOutlinePhone className=' w-full' />
								<h5 className=' text-xs w-full text-center'>Phone</h5>
							</div>
						</td>
						<td className=' w-2/3 text-sm text-center '>
							<h5 className='relative inline-block w-40'>
								{phone}
								<button className='text-2xl absolute -top-2 -right-8 text-blueSky'>
									<TbEdit
										onClick={() =>
											activateEdit(phoneInputDisabled, setPhoneEdit)
										}
									/>
								</button>
								<div
									className={`absolute top-0 -left-16 ${phoneInputDisabled}  w-64 h-10`}
								>
									<input
										type='text'
										name='phone'
										value={editData.phone}
										onChange={(event) =>
											editDataHandler(event, editData, setEditData)
										}
										className='shadow-img w-full z-20 h-full rounded-lg pl-2'
									/>
									<div className='absolute z-20 top-0 right-0 bg-white w-10 h-full rounded-lg flex justify-center items-center '>
										<CiSaveDown2
											onClick={() => {
												dispatch(updateHotel({ id, phone: editData.phone }));
												dispatch(fetchinHotelId(id));
												setPhoneEdit('hidden');
											}}
											className=' text-iconsPurple w-7 h-7 text-xl '
										/>
									</div>
									<div className='absolute bg-white rounded-full shadow-buttonAdd -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<AiOutlineCloseCircle
											onClick={() => setPhoneEdit('hidden')}
											className=' text-3xl text-red-400'
										/>
									</div>
								</div>
							</h5>
						</td>
					</tr>

					<tr className='h-10  pl-3'>
						<td className='w-full h-14 text-2xl text-iconsPurple  flex justify-center items-center'>
							<div className='flex flex-wrap justify-center items-center'>
								<AiOutlineBell className=' w-full' />
								<h5 className=' text-xs w-full text-center'>Check In / Out</h5>
							</div>
						</td>
						<td className=' w-2/3  text-sm text-center'>
							<h5 className='relative inline-block w-40'>
								{checkIn} / {checkOut}
								<button className='text-2xl absolute -top-2 -right-8 text-blueSky'>
									<TbEdit
										onClick={() =>
											activateEdit(checkInputDisabled, setCheckEdit)
										}
									/>
								</button>
								<div
									className={`absolute -top-28 left-0 ${checkInputDisabled} w-32  h-10`}
								>
									<div className='relative  rounded-t-xl h-40 p-2 flex flex-col justify-between'>
										<div className='absolute rounded-t-xl -z-10 top-0  left-0 w-full h-full bg-gray-800 opacity-60'></div>
										<div>
											<label
												htmlFor='checkIn'
												className='text-white block text-start
											
											 w-full '
											>
												CheckIn
											</label>
											<input
												type='text'
												name='checkIn'
												value={editData.checkIn}
												onChange={(event) =>
													editDataHandler(event, editData, setEditData)
												}
												className='shadow-img w-full z-20 h-10 rounded-lg pl-2'
											/>
										</div>
										<div>
											<label
												htmlFor='checkOut'
												className='text-white block text-start'
											>
												CheckOut
											</label>
											<input
												type='text'
												name='checkOut'
												value={editData.checkOut}
												onChange={(event) =>
													editDataHandler(event, editData, setEditData)
												}
												className='shadow-img w-full z-20 h-10 rounded-lg pl-2'
											/>
										</div>
									</div>

									<div className='absolute z-10  bg-iconsPurple pt-1 pb-1 w-full rounded-lg rounded-t-none flex justify-center items-center '>
										<CiSaveDown2
											onClick={() => {
												dispatch(
													updateHotel({
														id,
														checkIn: editData.checkIn,
														checkOut: editData.checkOut,
													})
												);

												dispatch(fetchinHotelId(id));
												setCheckEdit('hidden');
											}}
											className=' text-white w-7 h-7 text-xl '
										/>
									</div>
									<div className='absolute bg-white rounded-full shadow-buttonAdd -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<AiOutlineCloseCircle
											onClick={() => setCheckEdit('hidden')}
											className=' text-3xl text-red-400'
										/>
									</div>
								</div>
							</h5>
						</td>
					</tr>

					<tr className='h-10 '>
						<td className=' w-full h-14 text-2xl text-iconsPurple  flex justify-center items-center'>
							<div className='flex flex-wrap justify-center items-center'>
								<MdOutlineBedroomChild className=' w-full' />
								<h5 className=' text-xs w-full text-center'>Rooms</h5>
							</div>
						</td>
						<td className=' w-2/3 text-sm text-center '>
							<h5 className='relative inline-block w-40'>{numberRooms}</h5>
						</td>
					</tr>
				</tbody>
			</table>

			<h5 className='text-lg font-bold mt-3 mb-3 text-iconsPurple relative'>
				Description
				<button className='text-2xl absolute -top-2 right-0 text-blueSky'>
					<TbEdit
						onClick={() => activateEdit(descriptionInputDisabled, setDescriptionEdit)}
					/>
				</button>
				<div
					className={`absolute top-0 left-0 ${descriptionInputDisabled} h-24  w-full `}
				>
					<textarea
						name='overview'
						value={editData.overview}
						onChange={(event) => editDataHandler(event, editData, setEditData)}
						className='shadow-img w-full z-20 h-full rounded-lg p-2 font-normal overflow-auto text-black text-base'
					/>
					<div className='absolute z-20 top-0 right-0 bg-white w-10  rounded-lg flex justify-center items-center '>
						<CiSaveDown2
							onClick={() => {
								dispatch(updateHotel({ id, overview: editData.overview }));
								dispatch(fetchinHotelId(id));
								setDescriptionEdit('hidden');
							}}
							className=' text-iconsPurple w-7 h-7 text-xl '
						/>
					</div>
					<div className='absolute bg-white rounded-full shadow-buttonAdd -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
						<AiOutlineCloseCircle
							onClick={() => setDescriptionEdit('hidden')}
							className=' text-3xl text-red-400'
						/>
					</div>
				</div>
			</h5>
			<p className=' rounded-2xl h-32 overflow-y-auto mb-5 border-2 border-yellow-700 p-2'>
				{overview}
			</p>

			<h5 className='text-lg font-bold mt-3 text-iconsPurple'>Location</h5>
			<BiDirections className='inline mr-2 text-lg text-green-700' />

			<p className='text-sm inline'>{address}</p>
			<img
				src='https://cdn.forbes.com.mx/2015/05/google_maps.jpg'
				alt='google maps'
				className=' rounded-2xl w-full h-40 object-cover mb-5 mt-3'
			/>
			<button className='bg-black text-white w-full p-3 rounded-md'>
				Cambiar ubicacion
				<CiLocationOn className='inline text-2xl text-red-500 ml-2' />
			</button>

			<h5 className='text-lg font-bold mt-3 mb-3 text-iconsPurple'>Photos</h5>
			<hr />
		</div>
	);
};

export default SettingsHotel;
