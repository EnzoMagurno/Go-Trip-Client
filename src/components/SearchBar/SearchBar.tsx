"use client"
import { BsSearch } from "react-icons/bs"

const SearchBar = () => {
	return (
		<div className="relative">
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-12 rounded-full shadow-input outline-none pl-3 mt-2 mb-2 dark:bg-neutral-900  dark:placeholder:text-orangeBg dark:shadow-inset_orange dark:text-white`}
			/>
            <button onClick={() => alert("Searching")} className="absolute top-5 right-4 text-2xl text-iconsPurple dark:text-orangeBg">
            <BsSearch  style={{pointerEvents: "none"}} />
            </button>
          
		</div>
	);
};

export default SearchBar;
