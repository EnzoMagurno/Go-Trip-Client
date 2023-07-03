'use client';
import { FaUserEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { updatingUsersReal, deleteUsersReal, fetchingUsersReal, activeUsersReal, getallUsersReal } from '../../../redux/Features/UsersReal/usersRealSlice';
import { useDispatch } from 'react-redux';
import SelectUniversal from '../../SelectUniversal/SelectUniversal';



const UsersAdminContainer = (props) => {
	const dispatch = useDispatch();
	const {
		deletedAt,
		id,
		name,
		photoUser,
		postalCode,
		birthday,
		country,
		phone,
		phoneCode,
		gender,
		email,
		password,
		confirmPassword,
		address,
		dniPasaport,
		status,
		rol,
		dniPassport,
		thirdPartyCreated,
	} = props;




	const [userDataEdit, setUserEdit] = useState({
		deletedAt,
		id,
		name,
		photoUser,
		postalCode,
		birthday,
		country,
		phone,
		phoneCode,
		gender,
		email,
		password,
		confirmPassword,
		address,
		dniPasaport,
		status,
		rol,
		dniPassport,
		thirdPartyCreated,
	});








	const Rol =  rol ? rol[0].toUpperCase() + rol.slice(1, rol.length) : ""
	


	

	const handleUserChanges = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserEdit({
			...userDataEdit,
			[name]: value,
		});
	};





	const deletUser = (e) => {
		e.preventDefault()
		dispatch(deleteUsersReal(id))
		dispatch(getallUsersReal())
		dispatch(fetchingUsersReal())
	
		
	}
	/* const updateUser = (e) => {
		e.preventDefault();

		dispatch(updatingUsersReal(userDataEdit));
	}; */

	const [userIsActive, setUserIsActive] = useState(deletedAt ? "Active user" : "Lock user");
	const handleCheckChange =  () => {
		
		if (!deletedAt) {

			setUserIsActive('Active user');
			dispatch(deleteUsersReal(id))
			dispatch(getallUsersReal())
		dispatch(fetchingUsersReal())
	
		} else {
			setUserIsActive('Lock user');
			 dispatch(activeUsersReal(id))
			 dispatch(getallUsersReal())
		dispatch(fetchingUsersReal())
			
		}
	};



	

	return (
		<div className=' relative mt-3 mb-3'>
			{/* Informacion de ususario*/}

			<form className='relative w-full p-4 pt-7 pb-7 rounded-2xl bg-white shadow-buttonAdd '>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'
					alt='user'
					className='  w-20 h-20 object-cover rounded-full m-auto bg-white'
				/>

				<h5 className='text-center pt-3 pb-3 font-bold  text-2xl'>{name}</h5>

				<div className='grid grid-cols-2 gap-2 mb-3'>
					<div>
						<h5 className='text-sm font-medium'>Country</h5>
						<p className='text-sm'>{country}</p>
					</div>

					<div>
						<h5 className='text-sm font-medium '>Phone</h5>
						<p className='text-sm'>{phone}</p>
					</div>
					<div className='overflow-auto' >
						<h5 className='text-sm font-medium '>Email</h5>
					<span className='text-sm  inline-block  '>{email}</span>
					</div>
					
					<div>
						<h5 className='text-sm font-medium'>Rol</h5>
						<p className='text-sm'>{Rol}</p>
					</div>
				</div>

				<div className='flex justify-between items-center mt-2 mb-2 h-10'>
					<label
						htmlFor='rol'
						className=' font-medium text-zinc-500 w-2/5 text-sm'
					>
						Rol
					</label>
					<div className='relative  w-full h-full '>
					<SelectUniversal optionDefault={Rol} data={userDataEdit} />
					
					</div>
					
					
					
					

					{/* <input
								type='text'
								name='rol'
								value={userDataEdit.rol}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2 shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/> */}
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center mt-2 mb-2 h-10'>
						<label
							htmlFor='rol'
							className=' font-medium text-zinc-500  w-2/5 text-sm'
						>
							{userIsActive}
						</label>
						<div className='flex items-center w-full h-10'>

									<label
								htmlFor={id}
								className=' shadow-inset_custom w-14 h-8 cursor-pointer rounded-full inline-block relative dark:shadow-inset_BlueSky '
								onChange={handleCheckChange}
							>
								<input type='checkbox' id={id} className=' sr-only peer' />
								<span className='w-6 h-6 top-1 peer-checked:left-1 peer-checked:bg-zinc-600 absolute rounded-full bg-green-600   left-7 transition-all duration-300'></span>
							</label>
					
			
							
						</div>
					</div>
					

							<div className='flex items-center mt-2 mb-2 h-10'>
						<label
					
							className=' font-medium text-zinc-500 w-2/5 text-sm'
						>
							Delete User
						</label>
						<button
							onClick={deletUser}
							className='w-full bg-red-700 text-white p-2 rounded-md'
						>
							Delete User
						</button>
					</div>


					
				</div>
		
			</form>
		</div>
	);
};

export default UsersAdminContainer;
