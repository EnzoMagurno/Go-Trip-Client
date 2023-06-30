'use client';
import { IoIosArrowForward } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import { RiHotelLine, RiAdminLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface UserOptionsProps {
	window: string;
	closeWindow: never;
}

const UserOptions: React.FC<UserOptionsProps> = ({ window, closeWindow }) => {
	const router = useRouter();

	//!Matener Codigo
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [idSession, setIdSession] = useLocalStorage('idSession', '');
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [rolSession, setRolSession] = useLocalStorage('rol', '');

	useEffect(() => {
		// Obtener los valores del LocalStorage
		const storedUserName = JSON.parse(localStorage.getItem('username') || '');
		const storedAvatar = JSON.parse(localStorage.getItem('avatar') || '');

		// Actualizar los estados solo si los valores son diferentes a los actuales
		if (storedUserName !== userNameSession) {
			setUserNameSession(storedUserName);
		}
		if (storedAvatar !== avatarSession[0]) {
			setAvatarSession(storedAvatar);
		}
	}, []); //!Mantener Codigo

	// console.log(tokenSession);
	// console.log(idSession);
	// console.log(userNameSession);
	// console.log(avatarSession[0]);
	// console.log(rolSession);

	//!Mantener codigo
	const handleClick = () => {
		setTokenSession('');
		setIdSession('');
		setUserNameSession('');
		setAvatarSession(['']);
		setRolSession('');
		localStorage.removeItem('userData');
		router.push('/');
		closeWindow; //! No esta funcionando
	};

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
				<li className=' text-black h-16 flex justify-between items-center p-3'>
					{/* MANTENER CODIGO */}
					<img
						src={avatarSession[0]}
						alt={userNameSession}
						className='w-14 h-14 object-cover rounded-full'
					/>
					<h2 className=' w-full flex justify-center items-center h-full'>
						{userNameSession}
					</h2>
				</li>
				<li className='bg-white h-10 '>
					{/* MANTENER CODIGO */}
					<a
						onClick={() => {
							tokenSession && rolSession === 'admin'
								? router.push(`/myHotels/${idSession}`)
								: router.push('/beAHoteiler');
						}}
						// MANTENER CODIGO
						className='w-full flex justify-between items-center p-3'
					>
						{tokenSession && rolSession === 'admin' ? (
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
					</a>
				</li>
				<li className='bg-white h-10'>
					<Link
						href='/settings'
						className='w-full flex justify-between items-center p-3'
					>
						<div className='flex items-center justify-between'>
							<AiOutlineSetting className='inline text-2xl mr-3 text-blueSky' />{' '}
							Settings
						</div>
						<IoIosArrowForward className=' text-blueSky' />
					</Link>
				</li>
				<li className='bg-white h-10 '>
					<Link
						href='/admin'
						className='w-full flex justify-between items-center p-3'
					>
						<div className='flex items-center justify-between'>
							<RiAdminLine className='inline text-2xl mr-3 text-blueSky' />{' '}
							Admin
						</div>
						<IoIosArrowForward className=' text-blueSky' />
					</Link>
				</li>
			</ul>
			<ul className=' pt-5 pl-5 pr-5'>
				<li className='flex justify-end items-center text-red-400 '>
					<a
						onClick={() => {
							handleClick();
						}}
					>
						Log out
					</a>
					<CiLogout className='inline text-2xl ml-3' />
				</li>
			</ul>
		</div>
	);
};

export default UserOptions;
