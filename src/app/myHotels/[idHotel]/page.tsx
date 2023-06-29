'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { roboto } from '../../../app/page';
import ContainerTypesRooms from "../../../components/ContainerTypesRooms/ContainerTypesRooms";
import SettingsHotel from "../../../components/SettingsHotel/SettingsHotel";
import { useDispatch, useSelector } from "react-redux";
import { selectHotelIdState, fetchinHotelId } from "../../../redux/Features/Hotel/hotelsSlice";
import Link from "next/link";



const DetailHotel = ({ params }) => {

	const { idHotel } = params

    const dispatch = useDispatch()
    const hotel = useSelector(selectHotelIdState)
	const rooms: [] = hotel.rooms

	

    useEffect(() => {
		dispatch(fetchinHotelId(idHotel))

    }, [])



// hotel.rooms.map((h)=> rooms.push(h))
// console.log(rooms);


	return (
		<div className='p-5 pb-24'>
			<div>
				<SettingsHotel hotel={hotel} />
				<h3 className='mt-3 mb-3 text-lg font-bold text-iconsPurple'>
				Types Rooms
			</h3>
				<div className={`${roboto.className}  shadow-insetContainerTypeRooms border pb-5 rounded-2xl h w-ful grid grid-cols-1 gap-3`}>
				{rooms && rooms?.map((roomType: []) =>{
					return (
						<ContainerTypesRooms roomType={roomType}/>
					)
				})}
                <div className=" flex flex-wrap justify-center items-center">
						<Link href={`/createRoom/?id=${hotel.id}`} className='relative border-2 border-green-600 w-10 h-10 flex justify-center items-center rounded-full shadow-buttonAdd'>
							<div className='absolute border border-green-600 h-6 inline'></div>
							<div className='absolute border border-green-600 h-6 inline transform rotate-90'></div>
						</Link>
                        <h5 className='w-full text-center text-sm pt-2'>Add new room</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailHotel;
