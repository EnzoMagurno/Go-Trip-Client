const SearchBar = () => {
	return (
		<div>
			<input
				type='text'
				placeholder='Search'
				className={`w-full h-12 rounded-full shadow-input outline-none pl-3 mt-2 mb-2`}
			/>
		</div>
	);
};

export default SearchBar;
