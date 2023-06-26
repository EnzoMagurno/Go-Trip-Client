'use client';
import { IoIosArrowForward } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import { RiHotelLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';

interface UserOptionsProps {
	window: string
	closeWindow: never
}

const UserOptions: React.FC<UserOptionsProps> = ({ window, closeWindow }) => {
	return (
		<div className={`absolute right-3 ${window} top-12 z-50 bg-white w-4/5 h-60 pt-5 pb-5 rounded-3xl shadow-img flex flex-col justify-between`} >
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
					<img
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3RpnZuPp1mC_m2jzHSm1KNs9LUQY3YA7Ow&usqp=CAU'
						alt='persona'
						className='w-14 h-14 object-cover rounded-full'
					/>
					<h2 className=' w-full flex justify-center items-center h-full'>
						Chris Patterson Rollwick
					</h2>
				</li>
				<li className='bg-white h-10 '>
					<Link
						href='/beAHoteiler'
						className='w-full flex justify-between items-center p-3'
					>
						<div className='flex items-center justify-between'>
							<RiHotelLine className='inline text-2xl mr-3 text-blueSky'/> Be a hotelier
						</div>
						<IoIosArrowForward className=' text-blueSky' />
					</Link>
				</li>
				<li className='bg-white h-10'>
					<Link
						href='/settings'
						className='w-full flex justify-between items-center p-3'
					>
						<div className='flex items-center justify-between' >
							<AiOutlineSetting className='inline text-2xl mr-3 text-blueSky' /> Settings
						</div>
						<IoIosArrowForward className=' text-blueSky' />
					</Link>
				</li>
			</ul>
			<ul className='pl-5 pr-5'>
				<li className='flex justify-end items-center text-red-400 '>
					Log out
					<CiLogout className='inline text-2xl ml-3' />
				</li>
			</ul>
		</div>
	);
};

export default UserOptions;
