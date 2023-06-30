'use client';

import { useSelector } from 'react-redux';
const DateSelected = ({ toggleOpen }) => {
	const [dateOne, dateTwo] = useSelector((state) => state.date.dates);
	return (
		<>
		{
			dateTwo 
			? (
				<div className='flex items-center justify-evenly h-10'>

			<div className='flex flex-col items-center justify-evenly text-sm text-zinc-400 rounded-full w-60 p-1'>
	
				<div className='flex justify-evenly w-full items-center'>
					<p>Arrival</p>
					<div></div>
					<p>Exit</p>
				</div>
				
				<div onClick={toggleOpen} className='flex w-56 cursor-pointer justify-evenly items-center border  border-iconsPurple rounded-lg'>
					<p className='  rounded-lg p-1'>{dateOne}</p>
					<div>-</div>
					<p className=' rounded-lg p-1'>{dateTwo}</p>
				</div>
			</div>
		</div>
			) : (
				<></>
			)
		}
		</>
		
	);
};

export default DateSelected;
