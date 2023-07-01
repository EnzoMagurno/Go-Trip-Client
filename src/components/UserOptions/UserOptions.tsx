'use client';
import { IoIosArrowForward } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import { RiHotelLine, RiAdminLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface UserOptionsProps {
	window: string;
	closeWindow: () => void;
}

const UserOptions: React.FC<UserOptionsProps> = ({ window, closeWindow }) => {
	const router = useRouter();

	//!Matener Codigo
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

	const handleClick = () => {
		setTokenSession('');
		setIdSession('');
		setUserNameSession('');
		setAvatarSession(['']);
		setRolSession('');
		localStorage.removeItem('userData');
		router.refresh();
		closeWindow();
		setClickCount((prevCount) => prevCount + 1);
		router.push('/');
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedAvatarSession = localStorage.getItem('avatar');
			if (storedAvatarSession) {
				setAvatarSession(JSON.parse(storedAvatarSession));
			}
		}
	}, [typeof window !== 'undefined' && localStorage.getItem('avatar')]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedUserNameSession = localStorage.getItem('username');
			setUserNameSession(
				storedUserNameSession ? JSON.parse(storedUserNameSession) : ''
			);
		}
	}, [typeof window !== 'undefined' && localStorage.getItem('username')]);

	return (
		<div
			className={`absolute right-3 ${window} top-12 z-50 bg-white w-4/5  pt-5 pb-5 rounded-3xl shadow-img flex flex-col justify-between`}
		>
			<button
				onClick={closeWindow}
				className='absolute top-4 right-4 w-6 h-6 flex justify-center items-center '
			>
				<div>
					<div className='absolute top-1 w-0 h-4 border-l-2 border-red-400 rotate-45  border-solid'></div>
					<div className='absolute top-1  w-0 h-4 border-r-2 border-red-400 -rotate-45  border-solid'></div>
				</div>
			</button>
			<ul>
				<Link
					href={tokenSession ? `/userInfo/${idSession}` : `/login`}
					passHref
					onClick={() => {
						closeWindow();
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

				<li className='bg-white h-10 '>
					<Link
						href={
							rolSession === 'admin' || rolSession === 'host'
								? `/myHotels/${idSession}`
								: `/beAHoteiler`
						}
						passHref
						onClick={() => {
							closeWindow();
						}}
						className='w-full flex justify-between items-center p-3'
					>
						{rolSession === 'admin' || rolSession === 'host' ? (
							<div className='flex items-center justify-between'>
								<RiHotelLine className='inline text-2xl mr-3 text-blueSky' /> My
								Hotels
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
				<li className='bg-white h-10'>
					<Link
						href='/settings'
						className='w-full flex justify-between items-center p-3'
						passHref
						onClick={() => {
							closeWindow();
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
								closeWindow();
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
	);
};

export default UserOptions;
