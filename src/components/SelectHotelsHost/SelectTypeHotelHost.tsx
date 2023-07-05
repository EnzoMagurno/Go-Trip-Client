"use client"
import { CiCircleChevDown } from "react-icons/ci";

import { useState } from  "react";
import { useDispatch } from "react-redux";
import { filterHotelsByStatus } from "../../redux/Features/Hotel/hotelsSlice";
import OptionsTypeHotels from "./OptionsTypeHotels"; 
const SelectTypeHotels = ({optionDefault}) => {

    
    const [ optionSelected, setOptions ] = useState(optionDefault)



    const dispatch = useDispatch()

    const selectOptions =  (name: string | number, value: string | number) => {
        setOptions(name)
        dispatch(filterHotelsByStatus(value))
  
    };
    


    const [ optionsOpen, setShowBoxOptions ] = useState("hidden")


    const showOptions = () => {
        if (optionsOpen) {
            setShowBoxOptions("")
        } else {
            setShowBoxOptions("hidden")
        }
    }


  return (
    <div className="relative h-full">
         <button type="button" onClick={showOptions} 
        className={`w-full rounded-md h-full pl-2 pr-2 flex justify-between items-center cursor-pointer transition duration-200  shadow-input hover:bg-zinc-50 `} >
        <h5>{optionSelected}</h5>
        <CiCircleChevDown className="text-xl"/>

    </button>
    <div onClick={showOptions} className={`fixed top-0 left-0 w-full h-full bg-gray-600 z-10 bg-opacity-0 ${optionsOpen}`}></div> 
    <ul className={`absolute z-20 bg-white top-12 rounded-md shadow-buttonAdd w-full ${optionsOpen}`}>
        
        <OptionsTypeHotels value={"active"} name={"Active hotels"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} />
        <OptionsTypeHotels value={"disabled"} name={"Disabled hotels"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        <OptionsTypeHotels value={"all"} name={"All hotels"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        </ul>

    </div>
   
   
  )  
};


export default SelectTypeHotels;