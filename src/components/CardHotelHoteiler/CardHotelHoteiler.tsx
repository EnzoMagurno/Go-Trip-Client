import { RiHotelLine } from 'react-icons/ri';
import { roboto } from '../../app/page';
import Link from 'next/link';
import { Hotel } from "../../app/myHotels/page";

const CardHotelHoteiler: React.FC<Hotel> = ({ id, name, image }) => {
	return (
		<Link href={`myHotels/${id}`}>
			<div className='w-full relative m-auto rounded-2xl shadow-img  flex justify-center items-center '>
				<div className='absolute bg-gray-600 opacity-40 w-full h-full rounded-2xl flex justify-center items-center '></div>
				<img
					src={image}
					alt={name}
					className=' w-full h-60 object-cover rounded-2xl  '
				/>
				<RiHotelLine className='absolute w-9 h-9 top-4 left-4 p-1  border-2 border-solid border-white rounded-full text-white' />

				<h2
					className={`mt-2 absolute bg-white rounded-full bottom-5   text-center flex justify-center items-center p-2 pr-5 pl-5 text-clip ${roboto.className} text-iconsPurple  shadow-img`}
				>
					{name}
				</h2>
			</div>
		</Link>
	);
};

export default CardHotelHoteiler;
