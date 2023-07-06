'use client';
import GoTripLogo from '../../../public/Go-Trip-logo.svg';
import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs';
import Link from 'next/link';
import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import React from 'react';
import { countries } from 'countries-list';
import validation from './validation';
import { Errors } from './validation';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import spinner from '../login/loading.module.css';
import axios from '../../utils/axios';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { nameCheck } from '../../utils/index';
import { randomAvatar } from '../../utils/index';
import { useSession, signIn } from 'next-auth/react';
import GoogleAuth from '../../app/google/page';
import Cookies from 'universal-cookie';

import { border } from '@cloudinary/url-gen/qualifiers/background';

const asap = Asap({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });
export const listOfCountries = Object.values(countries);

export interface FormState {
	name: string;
	country: string;
	postalCode: string;
	phoneCode: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
	birthday: string;
	rol: string;
	gender: string;
	address: string;
	dniPasaport: string;
	photoUser: string[];
	thirdPartyCreated: boolean;
}

export interface DataLogin {
	username: string;
	passwordlogin: string;
}

const page = () => {
	const [countriesList, setCountriesList] = useState<string[]>([]);
	const [phoneCode, setPhoneCode] = useState<string[]>([]);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [emailDuplicate, setEmailDuplicate] = useState<boolean>(false);
	const [confirmShowPassword, setConfirmShowPassword] =
		useState<boolean>(false);

	const [tokenSession, setTokenSession] = useLocalStorage('token', ''); //!SessionToken
	const [sessionId, setSessionId] = useLocalStorage('idSession', ''); //!SesionID
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [rolSession, setRolSession] = useLocalStorage('rol', '');

	const [userSession, setUserSession] = useLocalStorage<FormState>('userData', {
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
		photoUser: [],
		thirdPartyCreated: false,
	}); //!SessionData
	const [dates, setDates] = useState<string>('');

	const PasswordIcon = showPassword ? AiOutlineEye : AiOutlineEyeInvisible;
	const ConfirmPasswordIcon = confirmShowPassword
		? AiOutlineEye
		: AiOutlineEyeInvisible;

	const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
	const router = useRouter();

	const optionsCountries: string[] = listOfCountries.map(
		(country) => country.name
	);
	const optionsPhone: string[] = listOfCountries.map(
		(country) => country.phone
	);
	const phoneSet: string[] = [...new Set(optionsPhone)].sort(
		(a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
	);

	const [errors, setErrors] = useState<Errors>({});

	const [form, setForm] = useState<FormState>({
		name: '',
		country: '',
		postalCode: '',
		phoneCode: '',
		phone: '',
		email: ''.trim(),
		password: '',
		confirmPassword: '',
		birthday: '',
		rol: 'user',
		gender: '',
		address: '',
		dniPasaport: '',
		photoUser: [''],
		thirdPartyCreated: false,
	});

	useEffect(() => {
		setPhoneCode(phoneSet);
		setCountriesList(optionsCountries);
		buttonStatus();
	}, [form]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validation({
				...form,
				[e.target.name]: e.target.value,
			})
		);
	};

	const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validation({
				...form,
				[e.target.name]: e.target.value,
			})
		);
	};

	const errorClassName =
		(errors.birthday && focusedField === 'password') ||
		(errors.birthday && focusedField === 'confirmPassword')
			? 'border-red-400'
			: '';

	const errorStyle = {
		border: errorClassName ? '1px solid red' : '',
	};

	const phoneHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPhoneLada = e.target.value;
		const phoneNumber = form.phone;
		if (phoneNumber && phoneNumber.startsWith('+')) {
			const extractedPhoneNumber = phoneNumber.slice(form.phoneCode.length);
			const updatedPhone = `${selectedPhoneLada}${extractedPhoneNumber}`;
			setForm(() => ({
				...form,
				phoneCode: selectedPhoneLada,
				phone: updatedPhone,
			}));
		} else {
			setForm(() => ({
				...form,
				phoneCode: selectedPhoneLada,
			}));
		}

		setErrors(
			validation({
				...form,
				[e.target.name]: e.target.value,
			})
		);
	};

	const buttonStatus = () => {
		if (
			!form.name ||
			!form.country ||
			!form.email ||
			!form.password ||
			!form.phone ||
			!form.phoneCode ||
			!form.confirmPassword ||
			!form.birthday ||
			errors.name ||
			errors.country ||
			errors.email ||
			errors.password ||
			errors.phone ||
			errors.phoneCode ||
			errors.confirmPassword ||
			errors.birthday
		) {
			setDisabled(true);
			// console.log(disabled)
		} else {
			setDisabled(false);
		}
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocusedField(e.target.name);
		setEmailDuplicate(false);
	};

	const handleBlur = () => {
		setFocusedField(null);
	};

	const handleSelectFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
		setFocusedField(e.target.name);
	};

	const handleDatePickerFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocusedField(e.target.name);
	};

	const handleDateChange = (value: Dayjs | null, fieldName: string) => {
		const dateValue = value?.format('DD-MM-YYYY');
		// console.log(dateValue,fieldName)

		setForm({
			...form,
			[fieldName]: dateValue,
		});
		setErrors(
			validation({
				...form,
				[fieldName]: dateValue,
			})
		);
	};

	const handleClickGoogle = () => {
		signIn();
	};

	// TODO: Revisar necesaria implementacion de esta Peticion en RTK

	const registerUser = async (form: FormState, data: DataLogin) => {
		//! Funcion para el registro y logeo obtencion del Token
		try {
			const responseRegister = await axios.post('user/createNewUser', form);
			const newUserData = responseRegister.data;

			const responseLogin = await axios.post('user/login', data);
			const dataLoggedUser = responseLogin.data.data;
			const tokenSession = responseLogin.data.tokenSession;
			setTokenSession(tokenSession);

			// console.log('Esto es el Data', dataLoggedUser); //! Check
			setSessionId(dataLoggedUser.id);
			setUserNameSession(dataLoggedUser.name);
			setAvatarSession(dataLoggedUser.photoUser);
			setRolSession(dataLoggedUser.rol);
			setUserSession({
				name: dataLoggedUser.name,
				birthday: dataLoggedUser.birthday,
				gender: dataLoggedUser.gender,
				address: dataLoggedUser.address,
				dniPasaport: dataLoggedUser.dniPasaport,
				rol: dataLoggedUser.rol,
				country: dataLoggedUser.country,
				postalCode: dataLoggedUser.postalCode,
				phoneCode: dataLoggedUser.phoneCode,
				phone: dataLoggedUser.phone,
				email: dataLoggedUser.email,
				password: dataLoggedUser.password,
				confirmPassword: dataLoggedUser.confirmPassword,
				photoUser: dataLoggedUser.photoUser,
				thirdPartyCreated: dataLoggedUser.thirdPartyCreated,
			});

			const cookies = new Cookies();
			const cookieToken = responseLogin.data.tokenSession;
			cookies.set('gotripCookie', cookieToken, { path: '/' });
			console.log('Cookie almacenada:', cookieToken);
			setLoading(true);

			router.push('/');
		} catch (error) {
			// console.log(error);
			setEmailDuplicate(true);
		}
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled === false) {
			const username = nameCheck(form.name);
			form.name = username;

			// console.log(form); //! Check Form

			if (form.photoUser[0] === '') {
				const avatar = randomAvatar();
				form.photoUser[0] = avatar;
			}

			const dataLogin: DataLogin = {
				username: form.email,
				passwordlogin: form.password,
			};

			// console.log(form); //!Check Form

			setLoading(true);

			setTimeout(() => {
				setLoading(false);
			}, 2000);
			// console.log('Petición de inicio de sesión');

			registerUser(form, dataLogin);
		} else {
			alert('Please check data, and try again');
		}
	};

	//TODO: Revisar y asignar values
	return (
		<>
			<div className='overflow-y-auto'>
				<div className='pl-5 flex w-full h-28'>
					<div className=' flex justify-start items-center w-1/4'>
						<a onClick={() => router.back()}>
							<BsArrowLeftShort className='text-5xl' />
						</a>
					</div>

					<div className=' flex justify-start items-center w-2/4'>
						<Link href=''>
							<Image className='w-40' src={GoTripLogo} alt='Go-Trip-Logo' />
						</Link>
					</div>
				</div>

				<div className='flex flex-col pl-5'>
					<h1 className={`${asap.className} text-3xl font-bold text-gray-900`}>
						Create new account
					</h1>

					<p
						className={`${asap.className}text-base text-gray-500 mt-3 mb-3 pb-2`}
					>
						A place where you can find your trip.
					</p>
				</div>

				<form className='pl-5 pr-5 flex flex-col'>
					{/* NAME */}
					<label className={`${josefin.className}`} htmlFor='nameInput'>
						Full name
					</label>
					<input
						className={`${
							josefin.className
						} border-2 rounded-xl my-2 pl-3 py-3 pb-3 ${
							(errors.name && focusedField === 'password') ||
							(errors.name && focusedField === 'confirmPassword')
								? 'border-red-300'
								: ''
						}`}
						type='text'
						onChange={handleChange}
						placeholder='Full name'
						id='nameInput'
						name='name'
						value={form.name}
						onFocus={handleFocus}
						onBlur={handleBlur}
						autoComplete='off'
					/>

					{errors.name && focusedField === 'name' && (
						<li className='text-red-400'>{errors.name}</li>
					)}

					{/* DATE */}
					<label className={`${josefin.className}`} htmlFor='nameInput'>
						Birthdate
					</label>
					<DatePicker
						style={errorStyle}
						name='birthday'
						onFocus={handleDatePickerFocus}
						onBlur={handleBlur}
						onChange={(value) => handleDateChange(value, 'birthday')}
						format={dateFormatList}
					/>

					{errors.birthday && focusedField === 'birthday' && (
						<li className='text-red-400'>{errors.birthday}</li>
					)}

					{/* COUNTRIES */}
					<label className={`${josefin.className}`} htmlFor='countryInput'>
						Country/Region
					</label>
					<select
						className={`border-2 rounded-xl pt-2 w-1/2 my-4 pl-3 py-3 pb-3 ${
							(errors.country && focusedField === 'password') ||
							(errors.country && focusedField === 'confirmPassword')
								? 'border-red-300'
								: ''
						}`}
						name='country'
						autoComplete='off'
						onChange={selectChange}
						onFocus={handleSelectFocus}
						onBlur={handleBlur}
						id='countryInput'
					>
						<option value='' className={`${josefin.className}`}>
							Select a country
						</option>
						{countriesList.sort().map((country) => (
							<option
								className={`${josefin.className}`}
								key={country}
								value={country}
							>
								{country}
							</option>
						))}
					</select>

					{errors.country && focusedField === 'country' && (
						<li className='text-red-400'>{errors.country}</li>
					)}

					{/* POSTAL */}
					<label className={`${josefin.className}`} htmlFor='postalCodeInput'>
						Postal code (Optional)
					</label>
					<input
						className={`${josefin.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 `}
						type='text'
						name='postalCode'
						placeholder='Postal Code'
						id='postalCodeInput'
						autoComplete='off'
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={handleChange}
					/>

					{errors.postalCode && focusedField === 'postalCode' && (
						<li className='text-red-400'>{errors.postalCode}</li>
					)}

					{/* PHONE CODE */}
					<label className={`${josefin.className}`} htmlFor='phone'>
						Phone number
					</label>
					<div>
						<div>
							<select
								className={`${
									josefin.className
								} border-2 rounded-xl mr-2 my-2 pl-3 py-3 pb-3 w-1/3 ${
									(errors.phoneCode && focusedField === 'password') ||
									(errors.phoneCode && focusedField === 'confirmPassword')
										? 'border-red-300'
										: ''
								}`}
								name='phoneCode'
								onFocus={handleSelectFocus}
								onBlur={handleBlur}
								onChange={phoneHandler}
							>
								<option className={`${josefin.className}`} value=''>
									Code
								</option>
								{phoneCode.map((phone) => (
									<option className={`${josefin.className}`} key={phone}>
										+{phone}
									</option>
								))}
							</select>

							{/* PHONE */}
							<input
								className={`${
									josefin.className
								} border-2 rounded-xl my-2 pl-3 py-3 pb-3 w-1/2
                                 ${
																		(errors.phone &&
																			focusedField === 'password') ||
																		(errors.phone &&
																			focusedField === 'confirmPassword')
																			? 'border-red-300'
																			: ''
																	}`}
								type='number'
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
					{errors.phoneCode && focusedField === 'phoneCode' && (
						<li className='text-red-400'>{errors.phoneCode}</li>
					)}
					{errors.phone && focusedField === 'phone' && (
						<li className='text-red-400'>{errors.phone}</li>
					)}

					{/* EMAIL */}
					<label className={`${josefin.className}`} htmlFor='email'>
						Email address
					</label>
					<input
						className={`${
							josefin.className
						} border-2 rounded-xl my-2 pl-3 py-3 pb-3 
                        ${
													(errors.email && focusedField === 'password') ||
													(errors.email && focusedField === 'confirmPassword')
														? 'border-red-300'
														: ''
												}`}
						type='email'
						name='email'
						onChange={handleChange}
						placeholder='Email address'
						onFocus={handleFocus}
						onBlur={handleBlur}
						id='email'
						autoComplete='off'
					/>

					{errors.email && focusedField === 'email' && (
						<li className='text-red-400'>{errors.email}</li>
					)}

					{/* PASSWORD */}

					<label className={`${josefin.className}`} htmlFor='password'>
						Password
					</label>
					<div className='relative '>
						<input
							className={`${
								josefin.className
							} border-2 rounded-xl my-2 pl-3 py-3 pb-3 w-full${
								errors.password && focusedField === 'confirmPassword'
									? ' border-red-300'
									: ''
							}`}
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={form.password}
							onChange={handleChange}
							placeholder='Create password'
							id='password'
							onFocus={handleFocus}
							onBlur={handleBlur}
							autoComplete='off'
						/>
						<PasswordIcon
							className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
							onClick={() => setShowPassword(!showPassword)}
						/>
					</div>
					{errors.password && focusedField === 'password' && (
						<li className='text-red-400'>{errors.password}</li>
					)}

					{/* CONFIRM PASSWORD */}

					<label className={`${josefin.className}`} htmlFor='password'>
						Confirm Password
					</label>
					<div className='relative '>
						<input
							className={`${josefin.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 w-full`}
							type={confirmShowPassword ? 'text' : 'password'}
							name='confirmPassword'
							onChange={handleChange}
							placeholder='Create password'
							id='confirmPassword'
							onFocus={handleFocus}
							onBlur={handleBlur}
							autoComplete='off'
						/>

						<ConfirmPasswordIcon
							className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
							onClick={() => setConfirmShowPassword(!confirmShowPassword)}
						/>
					</div>

					{errors.confirmPassword && focusedField === 'confirmPassword' && (
						<li className='text-red-400'>{errors.confirmPassword}</li>
					)}
				</form>
			</div>

			{/* SIGN BUTTON */}

			{/* //!STICKY DIV SIGN UP */}
			<div className='sticky inset-x-0 bottom-0 bg-white border-t-[3px] '>
				<div className='flex justify-center mt-5 items-center'>
					<button
						className={`${
							disabled ? `bg-[#3F0071] opacity-50` : `bg-[#3F0071]`
						} + text-white font-semibold py-4 px-4 rounded-full w-[85%]`}
						name='signButton'
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							handleClick(e);
						}}
						disabled={disabled}
					>
						Sign up
					</button>
				</div>
				{emailDuplicate ? (
					<li className='text-red-400 flex justify-center'>
						email is registered, try again!
					</li>
				) : null}
				{loading && (
					<div className='flex justify-center items-center mt-4'>
						<span className={spinner.loader}></span>
					</div>
				)}
				<div className='flex justify-center mt-3 items-center'>
					<svg
						className='mr-3'
						width='130'
						height='1'
						viewBox='0 0 139 1'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<line
							y1='0.5'
							x2='139'
							y2='0.5'
							stroke='black'
							strokeOpacity='0.35'
						/>
					</svg>
					<p className={`${poppins.className}`}>Or</p>
					<svg
						className='ml-3'
						width='130'
						height='1'
						viewBox='0 0 139 1'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<line
							y1='0.5'
							x2='139'
							y2='0.5'
							stroke='black'
							strokeOpacity='0.35'
						/>
					</svg>
				</div>

				<div className='flex justify-center mt-3 items-center'>
					
				</div>
				<div className='flex justify-center mt-3 items-center'>
					<GoogleAuth />
				</div>

				<div className='flex justify-center mt-5'>
					<p>
						Already have an account?{' '}
						<a className='text-[#3F0071]' onClick={() => router.push('/login')}>
							Login
						</a>
					</p>
					G
				</div>
			</div>
		</>
	);
};
export default page;
