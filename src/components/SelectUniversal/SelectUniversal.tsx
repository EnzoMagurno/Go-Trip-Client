"use client"
import { CiCircleChevDown } from "react-icons/ci";
import OptionsUniversal from "../OptionsUniversal/OptionsUniversal";
import { useState } from  "react";
import { fetchingUsersReal, getallUsersReal, updatingUsersReal } from "../../redux/Features/UsersReal/usersRealSlice";
import { useDispatch } from "react-redux";

const SelectUniversal = ({optionDefault, data, deleted}) => {

    
    const [ optionSelected, setOptions ] = useState(optionDefault)



    const dispatch = useDispatch()

    const selectOptions = async (name: string | number, value: string | number) => {
        setOptions(name)
         dispatch(updatingUsersReal({ ...data, rol: value}))
         dispatch(fetchingUsersReal())
         dispatch(getallUsersReal()) 
        
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
        disabled={deleted}
        className={`w-full rounded-md h-full pl-2 pr-2 flex justify-between items-center cursor-pointer transition duration-200  shadow-input ${deleted ? "bg-zinc-500 text-white hover:bg-none" : "hover:bg-zinc-50 " }`} >
        <h5>{optionSelected}</h5>
        <CiCircleChevDown className="text-xl"/>

    </button>
    <div onClick={showOptions} className={`fixed top-0 left-0 w-full h-full bg-gray-600 z-10 bg-opacity-0 ${optionsOpen}`}></div> 
    <ul className={`absolute z-20 bg-white top-12 rounded-md shadow-buttonAdd w-full ${optionsOpen}`}>
        
        <OptionsUniversal value={"user"} name={"User"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} />
        <OptionsUniversal value={"admin"} name={"Admin"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        <OptionsUniversal value={"host"} name={"Host"} selectOptions={selectOptions} showOptions={showOptions} optionSelected={optionSelected} /> 
        </ul>

    </div>
   
   
  )  
};

export default SelectUniversal;