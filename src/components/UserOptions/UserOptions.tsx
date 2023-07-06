'use client';
import { IoIosArrowForward } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import { RiHotelLine, RiAdminLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Cookies from 'universal-cookie';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { nameCheck } from '../../utils';

interface UserOptionsProps {
	window: string;
	closeWindow: () => void;
}

const UserOptions: React.FC<UserOptionsProps> = ({
	window,
	toggleOpen,
	isOpen,
}) => {
	const router = useRouter();

	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [idSession, setIdSession] = useLocalStorage('idSession', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [rolSession, setRolSession] = useLocalStorage('rol', '');

	const [clickCount, setClickCount] = useState(0);

	// console.log(tokenSession);
	// console.log(idSession);
	// console.log(userNameSession);
	// console.log(avatarSession[0]);
	// console.log(rolSession);

	const cookies = new Cookies();

	const handleClick = () => {
		setTokenSession('');
		setIdSession('');
		setUserNameSession('');
		setAvatarSession(['']);
		setRolSession('');
		localStorage.removeItem('userData');
		toggleOpen();
		signOut();
		cookies.remove('gotripCookie', { path: '/' });
		setClickCount((prevCount) => prevCount + 1);
		router.push('/');
	};

	const storedTokenSession = localStorage.getItem('token');

	const storedAvatarSession = localStorage.getItem('avatar');

	const storedUserNameSession = localStorage.getItem('username');

	const storedRolSession = localStorage.getItem('rol');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedRolSession;
			setRolSession(storedRolSession ? JSON.parse(storedRolSession) : '');
		}
	}, [typeof window !== 'undefined' && storedRolSession]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedAvatarSession;
			setAvatarSession(
				storedAvatarSession ? JSON.parse(storedAvatarSession) : ''
			);
		}
	}, [typeof window !== 'undefined' && storedAvatarSession]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedUserNameSession;
			setUserNameSession(
				storedUserNameSession
					? nameCheck(JSON.parse(storedUserNameSession))
					: ''
			);
		}
	}, [typeof window !== 'undefined' && storedUserNameSession]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			storedTokenSession;
			setTokenSession(storedTokenSession ? JSON.parse(storedTokenSession) : '');
		}
	}, [typeof window !== 'undefined' && storedTokenSession]);

	return (
		<div
			className={`absolute right-3 top-16 z-50 bg-white w-4/5 ${
				!isOpen ? 'shadow-none' : 'shadow-img'
			}   rounded-xl  flex flex-col justify-between`}
		>
			<motion.div
				initial={{ height: 0 }}
				animate={{ height: isOpen ? 'auto' : 0 }}
				transition={{ duration: 0.2 }}
				className='overflow-hidden'
			>
				{/* Contenido del elemento */}
				<div className='pt-3 pb-3'>
					<button
						onClick={toggleOpen}
						className='absolute top-4 right-4 w-6 h-6 flex justify-center items-center '
					>
						<div onClick={toggleOpen} className={`${!isOpen ? 'hidden' : ''}`}>
							<div className='absolute top-1 w-0 h-4 border-l-2 border-red-400 rotate-45  border-solid'></div>
							<div className='absolute top-1  w-0 h-4 border-r-2 border-red-400 -rotate-45  border-solid'></div>
						</div>
					</button>
					<ul>
						<Link
							href={tokenSession ? `/userInfo/${idSession}` : `/login`}
							passHref
							onClick={() => {
								toggleOpen();
							}}
						>
							<li className=' text-black h-16 flex justify-between items-center p-3'>
								{avatarSession &&
								avatarSession.length > 0 &&
								avatarSession[0] !== '' ? (
									<img
										src={avatarSession[0]}
										alt={userNameSession}
										className='w-14 h-14 object-cover rounded-full'
									/>
								) : (
									<img
										src={
											'https://res.cloudinary.com/dvjcqhpuz/image/upload/v1688169816/Avatars/profileIcon_jozcrb.png'
										}
										alt={userNameSession}
										className='w-14 h-14 object-cover rounded-full'
									/>
								)}

								<h2 className=' w-full flex justify-center items-center h-full'>
									{userNameSession}
								</h2>
							</li>
						</Link>
						{rolSession !== 'host' ? (
							<li className='bg-white h-10 '>
								<Link
									href={
										rolSession === 'admin' || rolSession === 'host'
											? `/myHotels`
											: `/beAHoteiler`
									}
									passHref
									onClick={() => {
										toggleOpen();
									}}
									className='w-full flex justify-between items-center p-3'
								>
									{rolSession === 'admin' ? (
										<div className='flex items-center justify-between'>
											<RiHotelLine className='inline text-2xl mr-3 text-blueSky' />{' '}
											My Hotels
										</div>
									) : (
										<div className='flex items-center justify-between'>
											<RiHotelLine className='inline text-2xl mr-3 text-blueSky' />
											Be a hotelier
										</div>
									)}

									<IoIosArrowForward className=' text-blueSky' />
								</Link>
							</li>
						) : null}
						<li className='bg-white h-10'>
							<Link
								href='/settings'
								className='w-full flex justify-between items-center p-3'
								passHref
								onClick={() => {
									toggleOpen();
								}}
							>
								<div className='flex items-center justify-between'>
									<AiOutlineSetting className='inline text-2xl mr-3 text-blueSky' />{' '}
									Settings
								</div>
								<IoIosArrowForward className=' text-blueSky' />
							</Link>
						</li>
						{tokenSession && rolSession === 'host' ? (
							<li className='bg-white h-10 '>
								<Link
									href='/admin'
									className='w-full flex justify-between items-center p-3'
									onClick={() => {
										toggleOpen();
									}}
								>
									<div className='flex items-center justify-between'>
										<RiAdminLine className='inline text-2xl mr-3 text-blueSky' />{' '}
										Admin
									</div>
									<IoIosArrowForward className=' text-blueSky' />
								</Link>
							</li>
						) : null}
					</ul>
					<ul className=' pt-5 pl-5 pr-5'>
						<li className='flex justify-end items-center text-red-400 '>
							{tokenSession ? (
								<button
									onClick={() => {
										handleClick();
									}}
								>
									Log out
									<CiLogout className='inline text-2xl ml-3' />
								</button>
							) : null}
						</li>
					</ul>
				</div>
			</motion.div>
		</div>
	);
};

export default UserOptions;
