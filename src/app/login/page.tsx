'use client';
import GoTripLogo from '../../../public/Go-Trip-logo.svg';
import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Errors } from './validation';
import validation from './validation';
import spinner from './loading.module.css';
import axios from '../../utils/axios';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FormState as FormRegister } from '../register/page';
import Cookies from 'universal-cookie';
import GoogleAuth from '../google/page';

const asap = Asap({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });

const page = () => {
	const router = useRouter();
	interface FormState {
		email: string;
		password: string;
	}
	const [form, setForm] = useState<FormState>({
		password: '',
		email: '',
	});
	const [errors, setErrors] = useState<Errors>({});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errorData, setErrorData] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [loadingTime, setLoadingTime] = useState(false);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [idSession, setIdSession] = useLocalStorage('idSession', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [rolSession, setRolSession] = useLocalStorage('rol', '');
	const [savedEmail, setSavedEmail] = useLocalStorage<string>('savedEmail', '');
	const [isChecked, setIsChecked] = useLocalStorage<boolean>(
		'savedEmail',
		false
	);

	const [userSession, setUserSession] = useLocalStorage<FormRegister>(
		'userData',
		{
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
		}
	); //!SessionData

	useEffect(() => {
		if (userSession.name !== '') {
			setLoading(false);
		}
	}, [userSession]);

	useEffect(() => {
		if (savedEmail && isChecked) {
			setForm({
				...form,
				email: savedEmail,
			});
		}
	}, []);

	let timeoutId: null | ReturnType<typeof setTimeout> = null;
	const PasswordIcon = showPassword ? AiOutlineEye : AiOutlineEyeInvisible;

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocusedField(e.target.name);
		setErrorData(false);
	};

	const handleBlur = () => {
		setFocusedField(null);
	};

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

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};

	const handleClickGoogle = () => {};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		// console.log(form); //!Check

		const newOriginalForm = { ...form };

		const newForm = {
			passwordlogin: newOriginalForm.password,
			username: newOriginalForm.email,
		};

		// console.log(newForm); //!Check

		axios
			.post('user/login', newForm, {
				// withCredentials: true,
			})
			.then((response) => {
				console.log(response.data); // Muestra la respuesta en la consola

				setTokenSession(response.data.tokenSession);
				setIdSession(response.data.data.id);
				setUserNameSession(response.data.data.name);
				setAvatarSession(response.data.data.photoUser);
				setRolSession(response.data.data.rol);
				setUserSession({
					name: response.data.data.name,
					birthday: response.data.data.birthday,
					gender: response.data.data.gender,
					address: response.data.data.address,
					dniPasaport: response.data.data.dniPasaport,
					rol: response.data.data.rol,
					country: response.data.data.country,
					postalCode: response.data.data.postalCode,
					phoneCode: response.data.data.phoneCode,
					phone: response.data.data.phone,
					email: response.data.data.email,
					password: response.data.data.password,
					confirmPassword: response.data.data.confirmPassword,
					photoUser: response.data.data.photoUser,
					thirdPartyCreated: response.data.data.thirdPartyCreated,
				});

				const cookies = new Cookies();
				const cookieToken = response.data.tokenSession;
				cookies.set('gotripCookie', cookieToken, { path: '/' });
				console.log('Cookie almacenada:', cookieToken);
				setLoading(true);
				// console.log('Petición de inicio de sesión');   //!Check

				setLoadingTime(true);
				setTimeout(() => {
					setLoading(false);
				}, 10000);

				if (isChecked) {
					const email = response.data.data.email;
					setSavedEmail(email.trim());
				}

				if (isChecked === false) {
					setSavedEmail('');
				}

				if (loading === false && loadingTime === false) {
					router.push('/');
				}
			})
			.catch((error) => {
				console.log(error); // Muestra el error en la consola
				setErrorData(true);
			});
	};

	return (
		<>
			<div className='p-5 flex  w-full h-28'>
				<div className=' flex justify-start items-center w-1/4'>
					<a onClick={() => router.push('/')}>
						<BsArrowLeftShort className=' text-5xl ' />
					</a>
				</div>
				<div className=' flex justify-start items-center w-2/4'>
					<Link href='' className='flex-initial'>
						<Image className='w-40' src={GoTripLogo} alt='Go-Trip-Logo' />
					</Link>
				</div>
				<div className='w-1/4 '></div>
			</div>

			<div className='flex flex-col p-5'>
				<h1 className={`${asap.className} text-5xl font-bold text-gray-900`}>
					Welcome
				</h1>
				<h1 className={`${asap.className} text-5xl font-bold text-gray-900`}>
					back!
				</h1>
				<p className={`${asap.className}text-base text-gray-500 mt-3`}>
					A place where you can find your trip.
				</p>
			</div>

			<div className='pl-5 pr-5 flex flex-col'>
				<input
					className={`${josefin.className} border-2 rounded-xl my-2 pl-3 py-3 `}
					type='text'
					autoComplete='off'
					name='email'
					value={form.email}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder='Email'
				/>
				{errors.email && focusedField === 'email' ? (
					<li className='text-red-400'>{errors.email}</li>
				) : null}
				<div className='relative '>
					<input
						className={`${josefin.className} border-2 rounded-xl my-2 pl-3 py-3 w-full`}
						type={showPassword ? 'text' : 'password'}
						autoComplete='off'
						name='password'
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						placeholder='Password'
					/>
					<PasswordIcon
						className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
						onClick={() => setShowPassword(!showPassword)}
					/>
				</div>
				{errors.password && focusedField === 'password' ? (
					<li className='text-red-400'>{errors.password}</li>
				) : null}
			</div>

			<div className='flex justify-around mt-4 '>
				<div className='justify-start'>
					<input
						type='checkbox'
						name=''
						id='rememberMeInput'
						checked={isChecked}
						autoComplete='off'
						onChange={handleCheckboxChange}
					/>
					<label
						htmlFor='rememberMeInput'
						className='justify-start text-[#A6A6A6] ml-1'
					>
						Remember me
					</label>
				</div>
				<Link href='' className='text-purple-800'>
					Forgot Password?
				</Link>
			</div>
			<div className=''>
				<div className='flex justify-center mt-8 items-center'>
					<button
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							if (errors.email !== '' || errors.password !== '') {
								// Mostrar alerta de que no se puede iniciar sesión debido a errores
								alert('No se puede iniciar sesión debido a errores.');
							} else {
								handleClick(e);
								// setLoading(true);
								// setTimeout(() => {
								// 	setLoading(false);
								// }, 2000);
								// console.log('Petición de inicio de sesión');
							}
						}}
						className={`bg-[#3F0071] text-white font-semibold py-4 px-4 rounded-full w-[85%] ${
							errors.email !== '' || errors.password !== ''
								? 'opacity-50 cursor-not-allowed'
								: ''
						}`}
						disabled={errors.email !== '' || errors.password !== ''}
					>
						Log in
					</button>
				</div>
			</div>
			{errorData ? (
				<span className='flex justify-center items-center mt-4 text-red-400'>
					Email or password incorrect, please try again!
				</span>
			) : null}

			{loading || loadingTime ? (
				<div className='flex justify-center items-center mt-4'>
					<span className={spinner.loader}></span>
				</div>
			) : null}

			<div className='flex justify-center mt-5 items-center'>
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

			<div className='flex justify-center mt-5 items-center'>
				
			</div>

			<div className='flex justify-center mt-6 items-center'>
				<GoogleAuth />
			</div>

			<div className='flex justify-center mt-6'>
				<p>
					Don’t have an account?{' '}
					<Link href='/register' className='text-[#3F0071]'>
						Sign in
					</Link>
				</p>
			</div>
		</>
	);
};

{
	/* <Link href='' className='text-purple-800'>
	Forgot Password?
</Link>; */
}

export default page;
