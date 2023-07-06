"use client"
import { BsSearch } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import Select from "../Select/Select";
import { getHotelsCoincidencesByCityId, cleanCoincedences, fetchingCity } from "../../redux/Features/Citys/CitySlice";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";


interface PropsSearchBar {
	showFilters: any
	inputIsDisabled: boolean
}

const SearchBar: React.FC<PropsSearchBar> = ({ toggleOpen, inputIsDisabled }) => {
	const dispatch = useDispatch()

	const searchParams = useSearchParams()
	const idCity = searchParams.get("city")



	const cityData = useSelector(state => state.city.city)
	const [ cityName, setCityName ] = useState("")
	console.log(cityData)

	const router = useRouter();
	const handlerSearch = (e) => {

		const nameCity = e.target.value
		console.log(nameCity);
		setCityName(nameCity)
		if (nameCity) dispatch(fetchingCity(nameCity))
		if (!nameCity) dispatch(cleanCoincedences())

	};


	useEffect(() => {
		if (cityData.city) setCityName(`${cityData.city}${cityData.state ? `, ${cityData.state}` : "" }, ${cityData.country}`)
		console.log(cityData)
	}, [cityData])

	return (
		<div className="relative">
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-11 rounded-full shadow-input text-iconsPurple outline-none pl-3 mb-2 dark:bg-neutral-900  dark:placeholder:text-orangeBg dark:shadow-inset_orange dark:text-white`}
				onChange={handlerSearch}
				value={cityName}
				disabled={false}
				spellCheck={false}
			/>
            <button onClick={() => { 
			
				
				router.push(`/resultsHotels?city=${cityData.id}`)

				dispatch(getHotelsCoincidencesByCityId(idCity))
			
			}} 
			className="absolute top-1 flex items-center justify-center bg-zinc-200 w-9 h-9 rounded-full right-1 text-2xl text-iconsPurple dark:text-orangeBg">
            <BsSearch  style={{pointerEvents: "none"}} className=" text-xl"/>
            </button>
			<Select toggleOpen={toggleOpen} />
		</div>
	);
};

export default SearchBar;
