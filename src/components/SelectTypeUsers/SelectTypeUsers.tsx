"use client"
import { CiCircleChevDown } from "react-icons/ci";
import OptionsTypeUsers from "../SelectTypeUsers/OptionsTypeUsers";
import { useState } from  "react";
import { useDispatch } from "react-redux";
import { filterByStatus } from "../../redux/Features/UsersReal/usersRealSlice";

const SelectTypeUsers = ({optionDefault}) => {

    
    const [ optionSelected, setOptions ] = useState(optionDefault)



    const dispatch = useDispatch()

    const selectOptions = async (name: string | number, value: string | number) => {
        setOptions(name)
        dispatch(filterByStatus(value))
  
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
        
        <OptionsTypeUsers value={"active"} name={"Active users"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} />
        <OptionsTypeUsers value={"disabled"} name={"Disabled users"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        <OptionsTypeUsers value={"all"} name={"All users"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        </ul>

    </div>
   
   
  )  
};

export default SelectTypeUsers;