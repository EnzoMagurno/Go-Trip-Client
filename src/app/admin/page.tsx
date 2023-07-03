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
            <div className="flex justify-center flex-wrap items-center bg-blue-200 pt-10 pb-10 rounded-xl">

            <RiAdminLine className=" text-9xl w-full" />
            <h1 className="w-full text-center text-3xl">Admin Adiel Hernandez</h1>
            </div>
            
            
            <ul className="w-full ">
                <LiOptionAdmin option={"All Hotels"} icon={SiHotelsdotcom} ruta="/admin/allHotels" />
                <LiOptionAdmin option={"All Users"} icon={FaUsers} ruta="/admin/allUsers" />
                <LiOptionAdmin option={"All Bookings"} icon={GiBookPile} ruta="/admin/allBookings" />
                <LiOptionAdmin option={"All Sales"} icon={IoStatsChartOutline} ruta="/admin/allSales" />
              
                
            </ul>
        </div>
    )
};

export default Admin;