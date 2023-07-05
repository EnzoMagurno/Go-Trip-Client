
import { useMemo, createElement } from 'react';
import { MdNavigateNext } from "react-icons/md";
import Link from 'next/link';
const LiOptionAdmin = ({ option, icon, ruta }) => {
	const TagIcon = useMemo(() => {
		return () =>
			createElement(icon, {
				className: ' text-orangeBg inline-block text-3xl mr-3',
			});
	}, [icon]);

	return (
        <Link href={ruta}>
		<li>
            
			<div className='flex justify-between h-14 items-center p-2 border-b border-zinc-400'>
            <div className='flex'>
                <TagIcon />
                <h5 className='text-lg text-zinc-500 '>{option}</h5>
                </div>	
				
                <MdNavigateNext className='text-orangeBg text-2xl' />
			</div>
		</li>
        </Link>
	);
};

export default LiOptionAdmin;
