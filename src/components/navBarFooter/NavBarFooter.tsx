import Link from 'next/link';
import { BsCalendarCheck } from 'react-icons/bs';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect } from 'react';
import {
	AiOutlineHome,
	AiOutlineHeart,
	AiOutlineMail,
	AiOutlineUser,
} from 'react-icons/ai';
const fStext = 'text-sm';

const NavBarFooter = () => {
	const [tokenSession, setTokenSession] = useLocalStorage('token', '');
	const [idSession, setIdSession] = useLocalStorage('idSession', '');
	const [rolSession, setRolSession] = useLocalStorage('rol', '');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storeduserIdSession = localStorage.getItem('idSession');
			if (storeduserIdSession) {
				setIdSession(JSON.parse(storeduserIdSession));
			}
		}
	}, [localStorage.getItem('idSession')]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storeduserTokenSession = localStorage.getItem('token');
			if (storeduserTokenSession) {
				setTokenSession(JSON.parse(storeduserTokenSession));
			}
		}
	}, [localStorage.getItem('token')]);

	return (
		<nav className=' flex justify-evenly z-30 text-iconsPurple bg-white shadow-input pt-3 pb-3 text-3xl fixed left-0 bottom-0 w-full '>
			<Link href='/'>
				<div className='flex justify-center items-center h-full flex-wrap'>
					<AiOutlineHome className='w-full flex items-center justify-center' />
					<p className={`${fStext} w-fullflex items-center justify-center`}>
						Home
					</p>
				</div>
			</Link>

			<Link href={`/myFavorites`}>
				<div className='flex justify-center items-center h-full flex-wrap'>
					<AiOutlineHeart className='w-full flex items-center justify-center' />
					<p className={`${fStext} w-fullflex items-center justify-center`}>
						Favorites
					</p>
				</div>
			</Link>

			<Link href={`/myBookings`}>
				<div className='flex justify-center items-center  h-full flex-wrap'>
					<BsCalendarCheck className='w-full text-2xl flex items-center justify-center' />
					<p className={`${fStext} w-full flex items-center justify-center`}>
						Reservation
					</p>
				</div>
			</Link>
			<Link href={`/userInfo/${idSession}`}>
				<div className='flex justify-center items-center h-full flex-wrap'>
					<AiOutlineUser className='w-full flex items-center justify-center' />
					<p className={`${fStext} w-fullflex items-center justify-center`}>
						Profile
					</p>
				</div>
			</Link>
		</nav>
	);
};
export default NavBarFooter;
