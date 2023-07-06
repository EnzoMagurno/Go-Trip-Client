"use client";
import { RiAdminLine } from "react-icons/ri";
import { SiHotelsdotcom } from "react-icons/si"
import { FaUsers } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";  
import { IoStatsChartOutline } from "react-icons/io5"
import LiOptionAdmin from "../../components/LitOptionAdmin/LiOptionAdmin";
 import { useLocalStorage } from "../../hooks/useLocalStorage";
const Admin = () => {

    const [ userPicture, setUserPicture ] = useLocalStorage("avatar", "")
    const [ userName, setUserName ] = useLocalStorage("username", [""])


    return (
        <div className="flex justify-center flex-wrap items-center p-5 ">
            <div className="flex justify-center flex-wrap items-center  pt-5 pb-5 rounded-xl">

                <div className=" w-36 h-36 border-2 border-iconsPurple bg-white rounded-full flex justify-center items-center">
                <img src={  userPicture[0] ? userPicture[0] :  "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png" } alt={userPicture} className="w-full h-full object-cover rounded-full" />
                </div>

                <h2 className="w-full text-center mt-2 text-2xl font-medium">Admin</h2>
            <h2 className="w-full text-center mt-2 font-medium text-2xl">{userName}</h2>
            </div>
            
            
            <ul className="w-full ">
                <LiOptionAdmin option={"All Hotels"} icon={SiHotelsdotcom} ruta="/admin/allHotels" />
                <LiOptionAdmin option={"All Users"} icon={FaUsers} ruta="/admin/allUsers" />
                
            </ul>
        </div>
    )
};

export default Admin;