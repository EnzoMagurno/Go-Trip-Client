"use client"
import { IoIosClose } from "react-icons/io";
import DatePick from "../DatePicker/DatePick";
import SearchBar from "../SearchBar/SearchBar";
import DateSelected from "../DateSelected/DateSelected";
import { useState } from "react"; 
import { motion } from "framer-motion";

const FiltersBar:React.FC = () => {

    const [ openFilters, setOpenFilters ] = useState("")
    const [ inputIsDisabled, setInputIsDisabled ] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    const showFilters = () => {
        
        setTimeout(() => {
            if (!openFilters) {
                setOpenFilters("hidden")
                
            } else {
                setOpenFilters("")
                setInputIsDisabled(true)
            }
        }, 150)
      
    }
    return (
        <div className="relative shadow-img p-2  mt-3 rounded-2xl">
            <SearchBar toggleOpen={toggleOpen} inputIsDisabled={inputIsDisabled}  />

            <div>
      
      <div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        {/* Contenido del elemento */}
        <div className={`relative  bg-white z-20 w-full  rounded-xl ${openFilters}`}>
                <IoIosClose onClick={toggleOpen} className="absolute inline-block cursor-pointer text-red-500 -top-1 right-0 text-4xl" />
            <DatePick open={openFilters} setInputIsDisabled={setInputIsDisabled} toggleOpen={toggleOpen}/>
            </div>
  
      </motion.div>
    </div>
    </div>
            
           
            <DateSelected toggleOpen={toggleOpen}/>

           
            
        </div>
    )
}

export default FiltersBar