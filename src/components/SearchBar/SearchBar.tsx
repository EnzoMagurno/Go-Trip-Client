"use client"
import { BsSearch } from "react-icons/bs"
import { useDispatch } from "react-redux";
import Select from "../Select/Select";
import { fetchingCity, searchCoincidences } from "../../redux/Features/Citys/CitySlice";
import { useState } from "react";


const SearchBar = () => {
	const dispatch = useDispatch()
	
	const [ searchInput, setSearchInput ] = useState("")

	const handlerSearch = (e) => {
		setSearchInput(e.target.value)
		dispatch(searchCoincidences(e.target.value))

	};

	return (
		<div className="relative">
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-12 rounded-full shadow-input outline-none pl-3 mt-2 mb-2 dark:bg-neutral-900  dark:placeholder:text-orangeBg dark:shadow-inset_orange dark:text-white`}
				onChange={handlerSearch}
				value={searchInput}
			/>
            <button onClick={() => dispatch(fetchingCity())} className="absolute top-5 right-4 text-2xl text-iconsPurple dark:text-orangeBg">
            <BsSearch  style={{pointerEvents: "none"}} />
            </button>
			<Select />
		</div>
	);
};

export default SearchBar;
