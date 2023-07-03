
import { useMemo, createElement } from 'react';
import { GrFormNext } from "react-icons/gr";
import Link from 'next/link';
const LiOptionAdmin = ({ option, icon, ruta }) => {
	const TagIcon = useMemo(() => {
		return () =>
			createElement(icon, {
				className: ' text-iconsPurple inline-block text-3xl mr-3',
			});
	}, [icon]);

	return (
        <Link href={ruta}>
		<li>
            
			<div className='flex justify-between h-12 items-center p-2 border-b border-iconsPurple'>
            <div className='flex'>
                <TagIcon />
                <h5 className='text-lg '>{option}</h5>
                </div>	
				
                <GrFormNext />
			</div>
		</li>
        </Link>
	);
};

export default LiOptionAdmin;
