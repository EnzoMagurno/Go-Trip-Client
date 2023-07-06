import { cleanCoincedences, getNameAndIdCity } from "../../redux/Features/Citys/CitySlice";
import {  fetchingHotel } from "../../redux/Features/Hotel/hotelsSlice";
import { BsPinMapFill } from "react-icons/bs"
import { useDispatch } from "react-redux";

interface OptionsObj {
	city: string
	state: string
	country: string
	id: string | number
}

const Options: React.FC<OptionsObj> = ({ city, state, country, id, toggleOpen }) => {



	const dispatch = useDispatch();
	return (
		<li onClick={() => { 
			dispatch(getNameAndIdCity({id, city, state, country}));
			dispatch(cleanCoincedences())
			toggleOpen()
			
			}} className='h-16 flex justify-start items-center cursor-pointer border-b border-solid border-zinc-300 '>
			<div className="flex items-center">
                <div className=" bg-purple-50 w-12 h-12 flex justify-center items-center rounded-lg">
                    <BsPinMapFill  className="text-2xl text-iconsPurple"/> 
                </div>
                <div className=" pl-3 text-blueDark">
                    <h3 className="">{city}</h3>
				<p className=" text-xs">{state}, {country}</p>

                </div>
				
			</div>
		</li>
	);
};

export default Options;
