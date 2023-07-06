'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FormState } from '@/app/register/page';
import { DataLogin } from '@/app/register/page';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

import axios from '../../utils/axios';

function GoogleAuth() {
	const [tokenSession, setTokenSession] = useLocalStorage('token', ''); //!SessionToken
	const [sessionId, setSessionId] = useLocalStorage('idSession', ''); //!SesionID
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [rolSession, setRolSession] = useLocalStorage('rol', '');
	const [stateGoogle, setStateGoogle] = useState<Boolean>(false);

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
		thirdPartyCreated: true,
	});

	const storedUserNameSession = localStorage.getItem('username');
	const storedTokenSession = localStorage.getItem('token');
	const storedAvatarSession = localStorage.getItem('avatar');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedUserNameSession;
			setUserNameSession(
				storedUserNameSession ? JSON.parse(storedUserNameSession) : ''
			);
		}
	}, [typeof window !== 'undefined' && storedUserNameSession]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedTokenSession;
			setTokenSession(storedTokenSession ? JSON.parse(storedTokenSession) : '');
		}
	}, [typeof window !== 'undefined' && storedTokenSession]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedAvatarSession;
			setAvatarSession(
				storedAvatarSession ? JSON.parse(storedAvatarSession) : ''
			);
		}
	}, [typeof window !== 'undefined' && storedAvatarSession]);

	const { data: session } = useSession();
	// console.log(session?.user); //!Check User
	// console.log(session?.user?.name);

	const router = useRouter();

	const registerGoogleUser = async (form: FormState, data: DataLogin) => {
		//! Funcion para el registro y logeo obtencion del Token

		//!Creacion de nuevo Usuario, se necesita saber si ese correo ya existe de alguna forma para no crear otro usuario
		if (session?.user) {
			try {
				try {
					const responseRegister = await axios.post('user/createNewUser', form);
					const newUserData = responseRegister.data;
					// console.log('Esto es newUserData Register', newUserData);
				} catch (error) {
					// console.log(error);
					// console.log('Esto es la data en el error antes del login', data);
					const responseLogin = await axios.post('user/login', data);
					const dataLoggedUser = responseLogin.data.data;
					// console.log('Respuesta del login', dataLoggedUser);
					const tokenSession = responseLogin.data.tokenSession;
					setTokenSession(tokenSession);

					// console.log(
					// 	'Esto es el Data Error despues del login',
					// 	dataLoggedUser
					// ); //! Check
					setTokenSession(responseLogin.data.tokenSession);
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
					// console.log('Cookie almacenada:', cookieToken);
					router.push('/');
				}

				const responseLogin = await axios.post('user/login', data);
				const dataLoggedUser = responseLogin.data.data;
				const tokenSession = responseLogin.data.tokenSession;
				setTokenSession(tokenSession);

				// console.log('Esto es el Data', dataLoggedUser); //! Check
				setTokenSession(responseLogin.data.tokenSession);
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
				// console.log('Cookie almacenada:', cookieToken);
				router.push('/');
			} catch (error) {
				// console.log(error);
			}
		}
	};

	const dataLogin: DataLogin = {
		username: form.email,
		passwordlogin: form.password,
	};

	const getGoogleData = (setForm: any) => {
		// console.log('Esto es la dataGoogle', session?.user); //! Check la Data de Google

		setForm({
			...form,
			name: session?.user?.name,
			rol: 'user',
			email: session?.user?.email,
			password: 'User12345',
			confirmPassword: 'User12345',
			photoUser: [session?.user?.image],
			thirdPartyCreated: true,
		});

		// console.log('Esto es el form', form);
	};

	useEffect(() => {
		getGoogleData(setForm);
	}, [session]);

	useEffect(() => {
		// console.log('Esto es el form', form);
	}, [form]);

	useEffect(() => {
		// console.log('Esto es el DataLogin', dataLogin);
		registerGoogleUser(form, dataLogin);
	}, [form]);

	return (
		<>
			<button
				onClick={() => {
					signIn();
				}}
				className='text-gray-600 font-semibold py-3 px-3 rounded-full w-[85%] border border-gray-500 border-opacity-100 flex justify-center'
			>
				<svg
					className='mr-2'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 48 48'
					width='26'
					height='26'
				>
					<path
						fill='#FFC107'
						d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
					/>
					<path
						fill='#FF3D00'
						d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
					/>
					<path
						fill='#4CAF50'
						d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
					/>
					<path
						fill='#1976D2'
						d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
					/>
				</svg>
				Sign up with Google
			</button>
		</>
	);
}

export default GoogleAuth;
