"use client"
import { CiCircleChevDown } from "react-icons/ci";
import OptionsUniversal from "../OptionsUniversal/OptionsUniversal";
import { useState } from  "react";


const SelectUniversal = ({optionDefault}) => {


    const [ optionSelected, setOptions ] = useState(optionDefault)


    const selectOptions = (name: string | number, value: string | number) => {
        setOptions(name)
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
         <div onClick={showOptions} className="w-full rounded-md h-full pl-2 pr-2 flex justify-between items-center cursor-pointer transition duration-200 hover:bg-zinc-50 shadow-input">
        <h5>{optionSelected}</h5>
        <CiCircleChevDown className="text-xl"/>
    </div>
    <div onClick={showOptions} className={`fixed top-0 left-0 w-full h-full bg-gray-600 z-10 bg-opacity-0 ${optionsOpen}`}></div> 
    <ul className={`absolute z-20 bg-white top-12 rounded-md shadow-buttonAdd w-full ${optionsOpen}`}>
        
        <OptionsUniversal value={"user"} name={"User"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected}/>
        <OptionsUniversal value={"admin"} name={"Admin"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        <OptionsUniversal value={"host"} name={"Host"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        </ul>

    </div>
   
   
  )  
};

export default SelectUniversal;