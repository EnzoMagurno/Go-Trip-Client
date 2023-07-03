const FormEditAdminHotel = () => {



    /*const [userDataEdit, setUserEdit] = useState({
		photoUser,
		postalCode,
		birthday,
		country,
		phoneCode,
		gender,
		password,
		confirmPassword,
		dniPasaport,
		status,
		dniPassport,
		thirdPartyCreated,
		id: id,
		name: name,
		phone: phone,
		email: email,
		address: address,
		rol: rol,
	});

	const [editUserWindow, setEditUserWindow] = useState('hidden');

	const showFormEditUser = () => {
		setUserEdit({
			photoUser,
			postalCode,
			birthday,
			country,
			phoneCode,
			gender,
			password,
			confirmPassword,
			dniPasaport,
			status,
			dniPassport,
			thirdPartyCreated,
			id: id,
			name: name,
			phone: phone,
			email: email,
			address: address,
			rol: rol,
		});

		if (editUserWindow) {
			setEditUserWindow('');
		} else {
			setEditUserWindow('hidden');
		}
	};

	const handleUserChanges = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserEdit({
			...userDataEdit,
			[name]: value,
		});
	};

	const updateUser = (e) => {

		e.preventDefault()
		
		dispatch(updatingUsersReal(userDataEdit))
	}
    return (
        <div
				className={`fixed z-50 inset-0 flex p-5 justify-center items-center left-0  bg-black bg-opacity-30 text-zinc-700 ${editUserWindow}`}
			>

			    */{/*Este div da la opacidad al fondo del formulario */}/*
				<div className='absolute w-full h-full'onClick={showFormEditUser}></div> 



				<form className='relative w-full p-4 pt-7 pb-7 rounded-2xl bg-white shadow-buttonAdd '>
					<div
						onClick={showFormEditUser}
						className='absolute top-3 right-3  w-5 h-5 flex justify-center items-center'
					>
						<div className='absolute h-4 rotate-45  border border-red-500'></div>
						<div className='absolute h-4 -rotate-45  border border-red-500'></div>
					</div>

					
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'
						alt='user'
						className='  w-24 h-24 object-cover rounded-full m-auto bg-white border border-2 shadow-buttonAdd'
					/>

					
					<h5 className='text-center pt-3 pb-3 font-bold text-2xl'>{name}</h5>
					<div className='flex flex-col'>
						<div className='flex justify-between items-center mt-2 mb-2 h-10'>
							<label
								htmlFor='name'
								className=' font-medium text-zinc-500 w-1/4 text-sm'
							>
								Name
							</label>
							<input
								type='text'
								name='name'
								value={userDataEdit.name}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2 shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/>
						</div>
						<div className='flex justify-between items-center mt-2 mb-2 h-10'>
							<label
								htmlFor='phone'
								className=' font-medium text-zinc-500 w-1/4 text-sm'
							>
								Phone
							</label>
							<input
								type='text'
								name='phone'
								value={userDataEdit.phone}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2  shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/>
						</div>
						<div className='flex justify-between items-center mt-2 mb-2 h-10'>
							<label
								htmlFor='email'
								className=' font-medium text-zinc-500 w-1/4 text-sm'
							>
								Email
							</label>
							<input
								type='text'
								name='email'
								value={userDataEdit.email}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2 shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/>
						</div>

						<div className='flex justify-between items-center mt-2 mb-2 h-10'>
							<label
								htmlFor='address'
								className=' font-medium text-zinc-500 w-1/4 text-sm'
							>
								Address
							</label>
							<input
								type='text'
								name='address'
								value={userDataEdit.address}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2 shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/>
						</div>

						<div className='flex justify-between items-center mt-2 mb-2 h-10'>
							<label htmlFor='rol' className=' font-medium text-zinc-500 w-1/4 text-sm'>
								Rol
							</label>
							<SelectUniversal optionDefault={rol}  />
							{/* <input
								type='text'
								name='rol'
								value={userDataEdit.rol}
								onChange={handleUserChanges}
								className=' h-full w-full rounded-md outline-none pl-2 shadow-inset_custom focus:border-2 focus:border-orangeBg text-sm'
							/> */}/*
						</div>

						
					</div>
					<button onClick={updateUser} className='w-full mt-5 bg-iconsPurple text-white p-2 rounded-md'>Save changes</button>
				</form>
			</div>
    )
}

export default FormEditAdminHotel;/*