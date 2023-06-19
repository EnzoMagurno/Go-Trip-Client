"use client"
import { BsSearch } from "react-icons/bs"
import { fetchingHotel } from "../../redux/Features/Hotel/hotelsSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
	const dispatch = useDispatch()
	

	return (
		<div className="relative">
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-12 rounded-full shadow-input outline-none pl-3 mt-2 mb-2 dark:bg-neutral-900  dark:placeholder:text-orangeBg dark:shadow-inset_orange dark:text-white`}
			/>
            <button onClick={() => dispatch(fetchingHotel())} className="absolute top-5 right-4 text-2xl text-iconsPurple dark:text-orangeBg">
            <BsSearch  style={{pointerEvents: "none"}} />
            </button>
          
		</div>
	);
};

export default SearchBar;
