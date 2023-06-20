'use client';
import { useSelector } from 'react-redux';
import Options from './Options';
import { selectCityState } from '../../redux/Features/Citys/CitySlice';
import { City } from '../../redux/Features/Citys/CitySlice';
const Select = () => {
	const cityResults: City[] = useSelector(selectCityState);

	return (
		<>
			{
            cityResults.length ? (
				<ul className='absolute top-16 z-50 w-full bg-white rounded-lg shadow-img p-3'>
					{cityResults.map((result) => (
						<Options
                        id={result.city_id}
							city={result.city}
							country={result.country}
							state={result.state}
						/>
					))}
				</ul>
			) : (
				<></>
			)}
		</>
	);
};

export default Select;
