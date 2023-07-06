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
					value={savedEmail && isChecked ? savedEmail : form.email}
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
				<button className='text-gray-600 font-semibold py-3 px-3 rounded-full w-[85%]  border border-gray-400 border-opacity-100 flex justify-center'>
					<svg
						className='mr-2'
						width='27'
						height='26'
						viewBox='0 0 27 26'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink=''
						xlinkHref='http://www.w3.org/1999/xlink'
					>
						<rect x='0.5' width='26' height='26' fill='url(#pattern0)' />
						<defs>
							<pattern
								id='pattern0'
								patternContentUnits='objectBoundingBox'
								width='1'
								height='1'
							>
								<use
									xlinkHref=''
									href='#image0_158_1619'
									transform='scale(0.00195312)'
								/>
							</pattern>
							<image
								id='image0_158_1619'
								width='512'
								height='512'
								xlinkHref=''
								href='data:image/png;base64,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'
							/>
						</defs>
					</svg>
					Sign up with Facebook
				</button>
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
