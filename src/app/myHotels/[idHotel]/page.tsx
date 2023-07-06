'use client';
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation"
import ContainerTypesRooms from "../../../components/ContainerTypesRooms/ContainerTypesRooms";
import SettingsHotel from "../../../components/SettingsHotel/SettingsHotel";
import { useDispatch, useSelector } from "react-redux";
import { selectHotelIdState, fetchinHotelId } from "../../../redux/Features/Hotel/hotelsSlice";
import Link from "next/link";
import { GalleryDrop } from "@/components/GalleryDrop/GalleryDrop";
import Image from 'next/image';
import ImageOptions from '@/components/Imageoptions/ImageOptions'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';



const DetailHotel = ({ params }) => {

	const { idHotel } = params

    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const hotel = useSelector(selectHotelIdState)
	const rooms: [] = hotel.rooms

	

    useEffect(() => {
		dispatch(fetchinHotelId(idHotel))

    }, [])



// hotel.rooms.map((h)=> rooms.push(h))
// console.log(rooms);

const [selectedImage, setSelectedImage] = useState("null");
	const [showOverlay, setShowOverlay] = useState(false);
  
	
	const handleImageClick = (image) => {
		setSelectedImage(image);
		setShowOverlay(true);
	  };
	
	  const handleCloseOverlay = () => {
		setShowOverlay(false);
	  };

	  interface RoomData {
		id: string
		price: number
		numRooms: number
		roomsInUse: number 
		description: string
		status: boolean
		ServicesRoom: any[]
		hotelId: string 
		gallery: string[]
	} 

	return (
		<div className='p-5 pb-24'>
			<div>
				<SettingsHotel hotel={hotel} />
				
			<h5 className='text-lg font-bold mt-3 mb-3 text-iconsPurple'>Photos</h5>
			<div className='m-5 max-h-64 overflow-scroll rounded-lg shadow-cardTypeRoom grid grid-cols-2 gap-2 p-2'>
				
			{hotel.gallery && hotel.gallery?.map((i: any, index: any)=> (
				<Image 
				key={index}
				className='rounded-xl'
				src={i.urlIMG}
				width={150}
				height={80}
				alt={`Image ${index}`}
				onClick={() => handleImageClick(i)}
				/>
				))}
				<GalleryDrop  idHotel={hotel.id} idRoom="" />
			</div>
				{showOverlay && (
        <ImageOptions image={selectedImage} onClose={handleCloseOverlay} />
      )}

				
			
				<h3 className='mt-3 mb-3 text-lg font-bold text-iconsPurple'>
				Types Rooms
			</h3>
				<div className={`  shadow-insetContainerTypeRooms border pb-5 rounded-2xl h w-ful grid grid-cols-1 gap-3`}>
				{rooms && rooms?.map((roomType: RoomData[]) =>{
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
