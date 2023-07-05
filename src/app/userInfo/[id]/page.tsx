'use client';

import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import Link from 'next/link';
import { BsArrowLeftShort } from 'react-icons/bs';
import GoTripLogo from '../../../../public/Go-Trip-logo.svg';
import Image from 'next/image';
import ContainerUsersInfo from '@/components/ContainerUsersInfo/ContainerUsersInfo';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const asap = Asap({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });

const UserInfo = () => {
	const [avatarSession, setAvatarSession] = useLocalStorage('avatar', ['']);
	const [userNameSession, setUserNameSession] = useLocalStorage('username', '');

	return (
		<>
			<div className='overflow-y-auto'>
				<div className='pl-5 flex w-full h-6'></div>
				<div className='flex flex-col pl-5'>
					<div className='relative'>
						<h1
							className={`${asap.className} text-3xl font-bold text-gray-900`}
						>
							Personal Details
						</h1>

						{avatarSession &&
						avatarSession.length > 0 &&
						avatarSession[0] !== '' ? (
							<img
								src={avatarSession[0]}
								alt={userNameSession}
								className='w-14 h-14 object-cover rounded-full absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer'
							/>
						) : null}
					</div>

					<p
						className={`${asap.className}text-base text-gray-500 mt-3 mb-3 pb-2`}
					>
						Keep your data always updated!
					</p>

					<ContainerUsersInfo />
				</div>
			</div>
		</>
	);
};

export default UserInfo;
