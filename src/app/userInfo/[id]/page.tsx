'use client';

import { Asap, Josefin_Sans, Poppins } from 'next/font/google';
import Link from 'next/link';
import { BsArrowLeftShort } from 'react-icons/bs';
import GoTripLogo from '../../../../public/Go-Trip-logo.svg';
import Image from 'next/image';
import ContainerUsersInfo from '@/components/ContainerUsersInfo/ContainerUsersInfo';

const asap = Asap({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300'] });

const UserInfo = () => {
	return (
		<>
			<div className='overflow-y-auto'>
				<div className='pl-5 flex w-full h-6'></div>
				<div className='flex flex-col pl-5'>
					<h1 className={`${asap.className} text-3xl font-bold text-gray-900`}>
						Personal Details
					</h1>

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
