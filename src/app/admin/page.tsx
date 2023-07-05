"use client";
import { RiAdminLine } from "react-icons/ri";
import { SiHotelsdotcom } from "react-icons/si"
import { FaUsers } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";  
import { IoStatsChartOutline } from "react-icons/io5"
import LiOptionAdmin from "../../components/LitOptionAdmin/LiOptionAdmin";
 
const Admin = () => {
    return (
        <div className="flex justify-center flex-wrap items-center p-5 ">
            <div className="flex justify-center flex-wrap items-center  pt-5 pb-5 rounded-xl">

                <div className=" w-32 h-32 border-2 border-iconsPurple bg-white rounded-full flex justify-center items-center">
                <RiAdminLine className=" text-6xl" />
                </div>
           
            <h1 className="w-full text-center mt-2 font-medium text-2xl">Host Adiel Hernandez</h1>
            </div>
            
            
            <ul className="w-full ">
                <LiOptionAdmin option={"All Hotels"} icon={SiHotelsdotcom} ruta="/admin/allHotels" />
                <LiOptionAdmin option={"All Users"} icon={FaUsers} ruta="/admin/allUsers" />
                
            </ul>
        </div>
    )
};

export default Admin;