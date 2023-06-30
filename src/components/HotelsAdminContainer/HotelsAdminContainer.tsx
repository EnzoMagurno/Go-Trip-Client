import { AiOutlineDelete, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { BsSave } from 'react-icons/bs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteHotel, fetchingHotel, updateHotel } from "../../redux/Features/Hotel/hotelsSlice";
const AdminContainer = (props) => {
	const {
		id,
		email,
		image,
		phone,
		name,
		checkIn,
		checkOut,
		city,
		state,
		country,
	} = props;

	const [inputCheck, setInputCheck] = useState('hidden');
	const [inputPhone, setInputPhone] = useState('hidden');
	const [inputEmail, setInputEmail] = useState('hidden');


    const [ inputsUpdated, setInputChecUpdated ] = useState({
        id: id,
        checkIn: checkIn,
        checkOut: checkOut,
        email: email,
        phone: phone,
    });


    const dispatch = useDispatch();



    const inputHandleChange = (e) => {

        const name = e.target.name
        const value = e.target.value
        setInputChecUpdated({
            ...inputsUpdated,
            [name]: value
        })
    }


    const dispatchUpdate = () => {
        dispatch(updateHotel(inputsUpdated))
        dispatch(fetchingHotel())
        setInputCheck("hidden")
        setInputPhone("hidden")
        setInputEmail("hidden")
    }

    const deleteHotelHandler = () => {
        dispatch(deleteHotel(id))
    }

	return (
		<div className='relative  flex flex-col rounded-lg shadow-img  text-sm p-3 mt-4 mb-4'>
			<div className='absolute top-6 left-4 bg-white shadow-input text-iconsPurple  bg-opacity-90 pt-1 pb-1 p-2 rounded-md max-w-'>
				<h5 className=' text-sm text-center font-medium  '>{name}</h5>
				<p className=''>{`
                            ${city}, 
                            ${state}, 
                            ${country}`}</p>
			</div>
			<div className='flex flex-col pt-2 pb-2 rounded-lg '>
				<img
					src={image}
					alt={name}
					className=' w-full h-40 m-auto shadow-img rounded-md object-cover '
				/>
				<div className='flex flex-col mt-2'>
					<div className='relative flex w-full flex-col  h-12'>
						<p className='w-full'>Check In/Out:</p>
						<p className='w-full '>{`${checkIn} / ${checkOut}`} </p>
						<div
							className={`absolute flex p-1 z-10 rounded-md bg-white  pr-1 h-10 items-center bottom-0 shadow-input  ${inputCheck}`}
						>
							<input
								type='text'
								className='pl-2 h-full border border-iconsPurple w-24 rounded-md outline-none  '
                                name="checkIn"
                                placeholder='CheckIn'
                                onChange={inputHandleChange}
                                value={inputsUpdated.checkIn}

							/>
                             <input
								type='text'
								className='pl-2 h-full w-24 border border-iconsPurple ml-2 rounded-md outline-none  '
                                name="checkOut"
                                placeholder='CheckOut'
                                onChange={inputHandleChange}
                                value={inputsUpdated.checkOut}
							/>
							<BsSave className='inline-block ml-1 text-lg text-green-900 ' 
                            onClick={dispatchUpdate}/>
                            <div className='absolute -top-9 right-0 bg-white rounded-full'>
                                <AiOutlineCloseCircle onClick={() => {
                                    setInputCheck("hidden")
                                }} className=' text-3xl text-red-700 '/>
                            </div>
                            
						</div>
						<TbEdit
							onClick={() => {
								if (inputCheck) {
									setInputCheck('');
								} else {
									setInputCheck('hidden');
								}
							}}
							className='absolute left-28  text-xl text-blueSky'
						/>
					</div>
					<div className='relative flex w-full flex-col  h-12'>
						<p>Phone:</p>
						<p className=''>{phone}</p>
						<div
							className={`absolute flex rounded-md pr-1 h-7 items-center bottom-0 shadow-input  ${inputPhone}`}
						>
							<input
								type='text'
								className='pl-2 h-full rounded-md outline-none  '
                                name="phone"
                                onChange={inputHandleChange}
                                value={inputsUpdated.phone}
							/>
							<BsSave className='inline-block   text-lg text-green-900 ' 
                               onClick={dispatchUpdate} />
						</div>
						<TbEdit
							onClick={() => {
								if (inputPhone) {
									setInputPhone('');
								} else {
									setInputPhone('hidden');
								}
							}}
							className='absolute left-28  text-xl text-blueSky'
						/>
					</div>

					<div className='relative flex w-full flex-col h-12 '>
						<p>Email:</p>
						<p className=''>{email}</p>
						<div
							className={`absolute flex rounded-md pr-1 h-7 items-center bottom-0 shadow-input ${inputEmail}`}
						>
							<input
								type='text'
								className='pl-2 h-full rounded-md outline-none  '
                                name='email'
                                onChange={inputHandleChange}
                                value={inputsUpdated.email}
							/>
                           
							<BsSave className='inline-block   text-lg text-green-900 ' 
                            onClick={dispatchUpdate} />
						</div>

						<TbEdit
							onClick={() => {
								if (inputEmail) {
									setInputEmail('');
								} else {
									setInputEmail('hidden');
								}
							}}
							className='absolute left-28  text-xl text-blueSky'
						/>
					</div>
				</div>

				{/* <button
								onClick={toggleOpen}
								className='absolute bottom-2 right-2 text-iconsPurple'
							>
								ver mas...
							</button>
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: isOpen ? 'auto' : 0 }}
								transition={{ duration: 0.4 }}
								className='overflow-hidden'
							>
								{/* Contenido del elemento */}

				{/*</motion.div> */}
			</div>
			<div className='flex justify-evenly'>
				<button className='flex justify-center items-center w-32 border text-sm border-red-600 text-red-600 rounded-md p-1 pl-0 pr-0 mt-2 font-medium hover:bg-red-600 hover:text-white transition duration-300'>
					Delete
					<AiOutlineDelete onClick={deleteHotelHandler} className='inline-block ml-1 text-lg' />
				</button>
				<button className='flex justify-center items-center w-32 border text-sm border-blue-400 text-blue-400 rounded-md p-1 pl-0 pr-0 mt-2 font-medium hover:bg-blue-500 hover:text-white transition duration-300'>
					Add new room
					<IoAddOutline className='inline-block ml-1 text-lg' />
				</button>
			</div>
		</div>
	);
};

export default AdminContainer;
