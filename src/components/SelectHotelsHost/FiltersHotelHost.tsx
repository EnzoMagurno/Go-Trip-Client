"use client"


import { searchByName } from "../../redux/Features/Hotel/hotelsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import SelectTypeHotels from "./SelectTypeHotelHost";
import SelectOrderHotelHost from "../SelectOrderHotelHost/SelectOrderHotelsHost";
const FiltersHotels = ({optionDefault, optionOrderDefault}) => {

    const [nameU, setName] = useState("")


    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        const hotelName = e.target.value
 
        setName(hotelName)
        
       
         
    }
    return (
        <div className="mb-5">
            <div className="relative shadow-buttonAdd">
            <input type="text" 
            className="bg-zinc-50 h-10 w-full pl-2  outline-iconsPurple "
            onChange={handleInputChange}
            value={nameU}
            placeholder="Search user..."
            />
            <div className="absolute bg-iconsPurple hover:bg-orangeBg transition duration-300 w-10 h-full top-0 right-0 cursor-pointer  flex items-center justify-center">
            <BsSearch 
            onClick={() => dispatch(searchByName(nameU))} className="text-2xl text-white"/> 
            </div>
           
            </div>
         
         <div className="flex  mt-3">
         <div className="h-10 w-1/2  mr-2">
            <SelectTypeHotels optionDefault={optionDefault}/>
            
            </div>
            <div className="h-10 w-1/4 ml-2" >
            <SelectOrderHotelHost optionDefault={optionOrderDefault} />
            </div>
         </div>
           
           
        </div>
    )
};

export default FiltersHotels;
