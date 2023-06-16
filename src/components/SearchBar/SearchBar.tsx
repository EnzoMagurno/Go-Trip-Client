"use client"
import { BsSearch } from "react-icons/bs"

const SearchBar = () => {
	return (
		<div className="relative">
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-12 rounded-full shadow-input outline-none pl-3 mt-2 mb-2`}
			/>
            <button onClick={() => alert("Searching")} className="absolute top-5 right-4 text-2xl text-iconsPurple">
            <BsSearch  style={{pointerEvents: "none"}} />
            </button>
          
		</div>
	);
};

export default SearchBar;
