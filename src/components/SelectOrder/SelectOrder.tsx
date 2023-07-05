"use client"
import { CiCircleChevDown } from "react-icons/ci";
import OptionsOrder from "../SelectOrder/OptionsOrder";
import { useState } from  "react";
import { useDispatch } from "react-redux";
import { orderAlpha } from "../../redux/Features/UsersReal/usersRealSlice";

const SelectOrder = ({optionDefault}) => {

    




    const dispatch = useDispatch()

    const selectOptions = async (name: string | number, value: string | number) => {

        dispatch(orderAlpha(value))
  
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
        <h5>{optionDefault}</h5>
        <CiCircleChevDown className="text-xl"/>

    </button>
    <div onClick={showOptions} className={`fixed top-0 left-0 w-full h-full bg-gray-600 z-10 bg-opacity-0 ${optionsOpen}`}></div> 
    <ul className={`absolute z-20 bg-white top-12 rounded-md shadow-buttonAdd w-full ${optionsOpen}`}>
        
        <OptionsOrder value={"az"} name={"A - Z"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionDefault} />
        <OptionsOrder value={"za"} name={"Z - A"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionDefault} /> 
     
        </ul>

    </div>
   
   
  )  
};

export default SelectOrder;