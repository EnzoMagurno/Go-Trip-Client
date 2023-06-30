'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'; // Importa ThunkDispatch
import { AnyAction } from 'redux';
import { useParams } from 'next/navigation';
import axios from '../../utils/axios';
import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import { AiOutlineEdit } from 'react-icons/ai';
import validation, { Errors } from '../../app/register/validation';
import { listOfCountries } from '../../app/register/page';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FormState } from '../../app/register/page';

const asap = Asap({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });

function ContainerUsersInfo() {
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [userSession, setUserSession] = useLocalStorage('userData', {
		name: '',
		birthday: '',
		gender: '',
		address: '',
		dniPasaport: '',
		rol: '',
		country: '',
		postalCode: '',
		phoneCode: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		photoUser: [''],
		thirdPartyCreated: false,
	}); //!SessionData

	const id = useParams().id;
	console.log(id);

	const userDataString = localStorage.getItem('userData'); //! MANTENER CODE
	let userFound = userDataString ? JSON.parse(userDataString) : null; //! MANTENER CODE

	console.log(userFound);

	const EditIcon = AiOutlineEdit;

	const optionsCountries: string[] = listOfCountries.map(
		(country) => country.name
	);
	const optionsPhone: string[] = listOfCountries.map(
		(country) => country.phone
	);
	const phoneSet: string[] = [...new Set(optionsPhone)].sort(
		(a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
	);

	const phoneCode = phoneSet.map((phone) => '+' + phone);
	// console.log(phoneCode);

	// const putURL =
	// 	'http://localhost:3001/user/updateUser/51840426-3c3b-486e-a8b1-538bc64c92a9';
	const putURL = `/user/updateUser/${id}`;

	const [editEnableName, setEditEnableName] = useState<boolean>(false);
	const [editEnableId, setEditEnableId] = useState<boolean>(false);
	const [editEnableEmail, setEditEnableEmail] = useState<boolean>(false);
	const [editEnablePhone, setEditEnablePhone] = useState<boolean>(false);
	const [editEnableCode, setEditEnableCode] = useState<boolean>(false);
	const [phoneCodeValue, setPhoneCodeValue] = useState<string>('');
	const [editEnableGender, setEditEnableGender] = useState<boolean>(false);

	const dispatchThunk: ThunkDispatch<any, void, AnyAction> = useDispatch(); // Ajusta el tipo de dispatch

	// console.log(users); //!Check Users
	// console.log(id); //!Check Params Id

	// console.log(userFound); //Check UserFound
	// console.log(userFound?.dniPasaport);

	const [form, setForm] = useState<FormState>({
		name: '',
		country: '',
		postalCode: '',
		phoneCode: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		birthday: '',
		rol: '',
		gender: '',
		address: '',
		dniPasaport: '',
		photoUser: [''],
		thirdPartyCreated: false,
	});

	const [errors, setErrors] = useState<Errors>({});
	const [focusedField, setFocusedField] = useState<string | null>(null);

	// console.log(form); //!Check Input

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocusedField(e.target.name);
	};

	const handleBlur = () => {
		setFocusedField(null);
	};

	const handleSelectFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
		setFocusedField(e.target.name);
	};

	const handleClickEdit = (event?: React.MouseEvent<SVGElement>) => {
		const buttonEditId = event?.currentTarget.id;
		// console.log(buttonEditId); //!Check Boton Name Click

		if (buttonEditId === 'editIconName') setEditEnableName(!editEnableName);
		if (buttonEditId === 'editIconId') setEditEnableId(!editEnableId);
		if (buttonEditId === 'editIconEmail') setEditEnableEmail(!editEnableEmail);
		if (buttonEditId === 'editIconPhone') setEditEnablePhone(!editEnablePhone);
		if (buttonEditId === 'editIconGender')
			setEditEnableGender(!editEnableGender);
	};

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const propertyClick = event.currentTarget.name;
		// console.log(propertyClick); //!Check  Boton Name Click

		if (propertyClick) {
			const data = { ...form };

			console.log('Esta es la data que esta subiendo', data);

			axios
				.put(putURL, data, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${tokenSession}`,
					},
				})
				.then((response) => {
					console.log('Successful modification');
					console.log(response.data);

					setUserNameSession(response.data.name);
					setAvatarSession(response.data.photoUser);
					setUserSession({
						name: response.data.name,
						birthday: response.data.birthday,
						gender: response.data.gender,
						address: response.data.address,
						dniPasaport: response.data.dniPasaport,
						rol: response.data.rol,
						country: response.data.country,
						postalCode: response.data.postalCode,
						phoneCode: response.data.phoneCode,
						phone: response.data.phone,
						email: response.data.email,
						password: response.data.password,
						confirmPassword: response.data.confirmPassword,
						photoUser: response.data.photoUser,
						thirdPartyCreated: response.data.thirdPartyCreated,
					});
				})
				.catch((error) => {
					// Ocurrió un error durante la solicitud
					console.error(error);
				});
		}
	};

	useEffect(() => {
		if (userFound) {
			setForm({ ...userFound });
			// console.log(form);
		}
	}, [editEnableName, editEnableId, editEnableEmail, editEnablePhone]);

	const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const property = event.target.name;
		const value = event.target.value;

		// console.log(property, value);

		setForm({
			...form,
			[property]: value,
		});
		setErrors(
			validation({
				...form,
				[property]: value,
			})
		);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({
			...form,
			[property]: value,
		});
		setErrors(
			validation({
				...form,
				[property]: value,
			})
		);
	};

	return (
		<>
			<div className=' overflow-y-auto pl-5 pr-5 flex flex-col mr-5 '>
				{/* N A M E EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
				<div className='mb-4 '>
					<div className='flex justify-between p-x-4 '>
						<label className={`${josefin.className}`} htmlFor='nameInput'>
							Full Name
						</label>
						{!editEnableName ? (
							<EditIcon
								id='editIconName'
								onClick={(event: React.MouseEvent<SVGElement>) => {
									handleClickEdit(event);
								}}
							/>
						) : (
							<button
								className='bg-red-400  text-xs rounded-full pl-2 pr-2  flex items-center justify-center'
								onClick={() => {
									setEditEnableName(!editEnableName);
									errors.name = '';
								}}
							>
								x
							</button>
						)}
					</div>
					{userFound && (
						//! INPUT NAME
						<input
							className={`${josefin.className} border-2 rounded-xl my-2 pl-3 pb-3 pt-3 w-full`}
							type='text'
							value={form?.name}
							disabled={editEnableName ? false : true}
							name='name'
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							autoComplete='off'
						/>
					)}
					{editEnableName && (
						<button
							className={`${
								!errors.name ? `bg-[#3F0071]` : `bg-[#3F0071] opacity-50`
							} text-white text-xs  py-1 px-1 rounded-full w-[25%]`}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								handleClick(event);
								setEditEnableName(!editEnableName);
							}}
							name='buttonEditName'
							disabled={errors.name ? true : false}
						>
							Save
						</button>
					)}
				</div>
				{errors.name && focusedField === 'name' && (
					<li className='text-red-400'>{errors.name}</li>
				)}
				{/* I   DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD */}
				<div className='mb-4 '>
					<div className='flex justify-between p-x-4 '>
						<label className={`${josefin.className}`} htmlFor='nameInput'>
							ID Number
						</label>
						{!editEnableId ? (
							<EditIcon
								id='editIconId'
								onClick={(event: React.MouseEvent<SVGElement>) => {
									handleClickEdit(event);
								}}
							/>
						) : (
							<button
								className='bg-red-400  text-xs rounded-full pl-2 pr-2  flex items-center justify-center'
								onClick={() => {
									setEditEnableId(!editEnableId);
									errors.name = '';
								}}
							>
								x
							</button>
						)}
					</div>
					{userFound && (
						// IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
						<input
							className={`${josefin.className} border-2 rounded-xl my-2 pl-3 pb-3 pt-3 w-full`}
							type='text'
							value={form?.dniPasaport}
							disabled={editEnableId ? false : true}
							name='dniPasaport'
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							autoComplete='off'
						/>
					)}
					{editEnableId && (
						<button
							className={`${
								!errors.dniPasaport ? `bg-[#3F0071]` : `bg-[#3F0071] opacity-50`
							} text-white text-xs  py-1 px-1 rounded-full w-[25%]`}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								handleClick(event);
								setEditEnableId(!editEnableId);
							}}
							name='buttonEditName'
							disabled={errors.dniPasaport ? true : false}
						>
							Save
						</button>
					)}
				</div>
				{errors.dniPasaport && focusedField === 'dniPasaport' && (
					<li className='text-red-400'>{errors.dniPasaport}</li>
				)}
				<div className='mb-4 '>
					{/* EMAIIIIIIIIIIIIILLLLLLLLLLLLLLL */}
					<div className='flex justify-between p-x-4 '>
						<label className={`${josefin.className}`} htmlFor='nameInput'>
							Email address
						</label>
						{!editEnableEmail ? (
							<EditIcon
								id='editIconEmail'
								onClick={(event: React.MouseEvent<SVGElement>) => {
									handleClickEdit(event);
								}}
							/>
						) : (
							<button
								className='bg-red-400  text-xs rounded-full pl-2 pr-2  flex items-center justify-center'
								onClick={() => {
									setEditEnableEmail(!editEnableEmail);
									errors.email = '';
								}}
							>
								x
							</button>
						)}
					</div>
					{userFound && (
						// EMAIL input //////////////////////////////////////////
						<input
							className={`${josefin.className} border-2 rounded-xl my-2 pl-3 pb-3 pt-3 w-full`}
							type='email'
							value={form?.email}
							disabled={editEnableEmail ? false : true}
							name='email'
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							autoComplete='off'
						/>
					)}
					{editEnableEmail && (
						<button
							className={`${
								!errors.email ? `bg-[#3F0071]` : `bg-[#3F0071] opacity-50`
							} text-white text-xs  py-1 px-1 rounded-full w-[25%]`}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								handleClick(event);
								setEditEnableEmail(!editEnableEmail);
							}}
							name='buttonEditEmail'
							disabled={errors.email ? true : false}
						>
							Save
						</button>
					)}
				</div>
				{errors.email && focusedField === 'email' && (
					<li className='text-red-400'>{errors.email}</li>
				)}
				{/* PHONEEEEEEEEEEEEEEEEEEEEEEEEEEEEE CODE */}
				<div className='mb-4 '>
					<div className='flex justify-between p-x-4 '>
						<label className={`${josefin.className}`} htmlFor='nameInput'>
							Phone number
						</label>
						{!editEnablePhone ? (
							<EditIcon
								id='editIconPhone'
								onClick={(event: React.MouseEvent<SVGElement>) => {
									handleClickEdit(event);
								}}
							/>
						) : (
							<button
								className='bg-red-400  text-xs rounded-full pl-2 pr-2  flex items-center justify-center'
								onClick={() => {
									setEditEnablePhone(!editEnablePhone);
									setEditEnableCode(!editEnableCode);
									errors.phoneCode = '';
									errors.phone = '';
								}}
							>
								x
							</button>
						)}
					</div>
					{/* PHONE CODEEEEEEEEEEEEEEEEEEEEEEEEE */}
					{userFound && (
						<div>
							<div>
								<select
									name='phoneCode'
									className={`${josefin.className} border-2 rounded-xl mr-2 my-2 pl-3 pb-3 pt-3 w-1/3`}
									onFocus={handleSelectFocus}
									onBlur={handleBlur}
									onChange={selectHandler}
									disabled={editEnablePhone ? false : true}
								>
									<option className={`${josefin.className}`} value={''}>
										Code
									</option>
									{phoneCode.map((phone) => (
										<option
											className={`${josefin.className}`}
											key={phone}
											value={phone}
											selected={phone === form.phoneCode}
										>
											{phone}
										</option>
									))}
								</select>
								{/* INPUT PHONEEEEEEEEEEEEEEE */}
								<input
									className={`${josefin.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 w-1/2`}
									type='number'
									value={form?.phone}
									disabled={editEnablePhone ? false : true}
									name='phone'
									placeholder='Phone Number'
									id='phone'
									onChange={handleChange}
									onFocus={handleFocus}
									onBlur={handleBlur}
									autoComplete='off'
								/>
							</div>
						</div>
					)}
					{editEnablePhone && (
						<button
							className={`${
								!errors.phoneCode && !errors.phone
									? `bg-[#3F0071]`
									: `bg-[#3F0071] opacity-50`
							} text-white text-xs  py-1 px-1 rounded-full w-[25%]`}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								handleClick(event);
								setEditEnablePhone(!editEnablePhone);
							}}
							name='buttonEditPhone'
							disabled={errors.phoneCode || errors.phone ? true : false}
						>
							Save
						</button>
					)}
				</div>
				{errors.phoneCode && focusedField === 'phoneCode' && (
					<li className='text-red-400'>{errors.phoneCode}</li>
				)}
				{errors.phone && focusedField === 'phone' && (
					<li className='text-red-400'>{errors.phone}</li>
				)}
				{/* G ENDEE EEEEEEEEEE EEEEEEEEEEE ERRRRRRRRRRRRRRRRRRR */}
				<div className='mb-4 '>
					<div className='flex justify-between p-x-4 '>
						<label className={`${josefin.className}`} htmlFor='nameInput'>
							Gender (opcional)
						</label>
						{!editEnableGender ? (
							<EditIcon
								id='editIconGender'
								onClick={(event: React.MouseEvent<SVGElement>) => {
									handleClickEdit(event);
								}}
							/>
						) : (
							<button
								className='bg-red-400  text-xs rounded-full pl-2 pr-2  flex items-center justify-center'
								onClick={() => {
									setEditEnableGender(!editEnableGender);
									errors.gender = '';
								}}
							>
								x
							</button>
						)}
					</div>
					{/* PHONE CODEEEEEEEEEEEEEEEEEEEEEEEEE */}
					{userFound && (
						<select
							name='gender'
							className={`${josefin.className} border-2 rounded-xl mr-2 my-2 pl-3 pb-3 pt-3 w-full`}
							onFocus={handleSelectFocus}
							onBlur={handleBlur}
							onChange={selectHandler}
							disabled={editEnableGender ? false : true}
						>
							<option className={`${josefin.className}`} value=''>
								Gender
							</option>
							<option
								className={`${josefin.className}`}
								value='Female'
								selected={form.gender === 'Female'}
							>
								Female
							</option>
							<option
								className={`${josefin.className}`}
								value='Male'
								selected={form.gender === 'Male'}
							>
								Male
							</option>
							<option
								className={`${josefin.className}`}
								value='Rather not to Say'
								selected={form.gender === 'Rather not to Say'}
							>
								Rather not to Say
							</option>
							<option
								className={`${josefin.className}`}
								value='Other'
								selected={form.gender === 'Other'}
							>
								Other
							</option>
						</select>
					)}
					{editEnableGender && (
						<button
							className={`${
								!errors.gender ? `bg-[#3F0071]` : `bg-[#3F0071] opacity-50`
							} text-white text-xs  py-1 px-1 rounded-full w-[25%]`}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								handleClick(event);
								setEditEnableGender(!editEnableGender);
							}}
							name='buttonEditGender'
							disabled={errors.gender ? true : false}
						>
							Save
						</button>
					)}
				</div>
				{errors.gender && focusedField === 'gender' && (
					<li className='text-red-400'>{errors.gender}</li>
				)}
				{/* //! FIN */}
			</div>
		</>
	);
}

export default ContainerUsersInfo;
