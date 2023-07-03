

const OptionsUniversal = ({ value, name, selectOptions, optionSelected, showOptions }) => {




    return (
        <li onClick={() => { selectOptions(name, value); showOptions()}} className={`rounded-md list-none pl-2 h-8 flex items-center cursor-pointer transition duration-200 hover:bg-iconsPurple hover:text-white ${optionSelected === name ? "border-2 border-orangeBg" : "" }`}>{name}</li>
    )
};

export default OptionsUniversal;