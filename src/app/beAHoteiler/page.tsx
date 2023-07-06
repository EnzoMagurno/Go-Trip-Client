'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import coverPhoto from './sources/portrait-beautiful-young-asian-women-happy-smile-relax-outdoor-swimming-pool-resort.jpg';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import axios from '../../utils/axios';
import { useEffect } from 'react';

const asapSemi = Asap({
	weight: ['600'],
	subsets: ['latin'],
});

const josefinRegular = Josefin_Sans({
	weight: ['400'],
	subsets: ['latin'],
});

function beAHoteiler() {
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [rolSession, setRolSession] = useLocalStorage('rol', '');
	const [idSession, setIdSession] = useLocalStorage('idSession', '');
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

	const router = useRouter();

	const handleClick = () => {
		const changeRol = { ...userSession, rol: 'admin' };
		console.log('Este es changeRol', changeRol);

		axios
			.put(`/user/updateUser/${idSession}`, changeRol, {
				headers: {
					Authorization: `Bearer ${tokenSession}`,
				},
			})

			.then((response) => {
				console.log('Successful modification');
				console.log(response.data);

				console.log('Ahora se cambio el rol', response.data);
				alert(
					'Congratulations, now you can rent your place!, to publish Hotels, login again'
				);

				setRolSession('admin');

				router.push('/hotelReg');
			})

			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className=' mt-20 bg-neutral-100 absolute inset-0 flex flex-col items-center justify-center px-10'>
			{/* <Image src={coverPhoto} alt='cover' className='w-full'></Image>  ESTA QUEDA MEJOR PARA LE VERSIÓN WEB*/}
			<h1 className={`${asapSemi.className} text-2xl `}>Hoteiler title</h1>
			<p className='p-5 text-justify'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ipsa
				quasi consectetur deleniti cumque! Laudantium saepe fugit ad labore
				dolor! Debitis, atque nihil. Animi tempora culpa ex ducimus, laborum
				repellat?
			</p>

			<Link
				href={''}
				passHref
				onClick={() => {
					handleClick();
				}}
				type='button'
				className={`${josefinRegular.className} bg-[#7533ac] flex flex-row items-center justify-center text-white mt-10 h-10 mx-auto rounded-full w-2/3 `}
			>
				Register your hotel
			</Link>
		</div>
	);
}

export default beAHoteiler;
