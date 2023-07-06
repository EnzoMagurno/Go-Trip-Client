'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FormState } from '@/app/register/page';
import { DataLogin } from '@/app/register/page';

import axios from 'axios';

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

	const { data: session } = useSession();
	console.log(session?.user);

	const registerGoogleUser = async (form: FormState, data: DataLogin) => {
		//! Funcion para el registro y logeo obtencion del Token

		//!Creacion de nuevo Usuario, se necesita saber si ese correo ya existe de alguna forma para no crear otro usuario
		try {
			if (!sessionId) {
				const responseRegister = await axios.post('user/createNewUser', form);
				const newUserData = responseRegister.data;

				const responseLogin = await axios.post('user/login', data);
				const dataLoggedUser = responseLogin.data.data;
				const tokenSession = responseLogin.data.tokenSession;
				setTokenSession(tokenSession);

				console.log('Esto es el Data', dataLoggedUser); //! Check
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
			}
		} catch (error) {
			console.log(error);
		}
	};

	const dataLogin: DataLogin = {
		username: form.email,
		passwordlogin: form.password,
	};

	const getGoogleData = () => {
		console.log('Esto es la dataGoogle', session?.user); //! Check la Data de Google

		setForm({
			name: session?.user?.name || '',
			birthday: '',
			gender: '',
			address: '',
			dniPasaport: '',
			rol: 'user',
			country: '',
			postalCode: '',
			phoneCode: '',
			phone: '',
			email: session?.user?.email || '',
			password: '',
			confirmPassword: '',
			photoUser: [''] || '',
			thirdPartyCreated: true,
		});
		setStateGoogle(true);
	};

	useEffect(() => {
		getGoogleData();
	}, []);

	useEffect(() => {
		dataLogin;
	}, []);

	useEffect(() => {
		getGoogleData();
	}, []);

	registerGoogleUser(form, dataLogin);

	return (
		<>
			<div>
				<h1>Hola</h1>
				<button
					onClick={() => {
						signIn();
					}}
				></button>
			</div>
		</>
	);
}

export default GoogleAuth;
