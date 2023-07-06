import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { MdOutlineBedroomParent, MdPeopleOutline } from 'react-icons/md';
import { BsKey } from 'react-icons/bs';
import { TfiGallery } from 'react-icons/tfi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { fetchingServices } from '@/redux/Features/Services/servicesSlice';
import { fetchRoomById, selectRoomIdState } from "../../redux/Features/Room/RoomSlice";
import { MainGlobal } from '@/redux/mainInterface';
import { GalleryDrop } from "../GalleryDrop/GalleryDrop";
import Image from 'next/image';
import ImageOptions from "../Imageoptions/ImageOptions";



export interface MyRoom  {
	id: string
	price: number
	numRooms: number
	roomsInUse: number 
	description: string
	status: boolean
	ServicesRoom: any[]
	hotelId: string 
	gallery: string[]
	room: any
} 


import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';


const ContainerTypesRooms = ({ roomType }: any) => {

	

	const [serviceName, setServiceName] = useState<any[]>([]);
	const room = useSelector(selectRoomIdState)

		const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

	const services = useSelector((state: MainGlobal) => state.services.dataService)
	
	

	const {
		id,  
		price, 
		numRooms, 
		roomsInUse, 
		description, 
		status, 
		ServicesRoom, 
		hotelId,
		gallery
	} = roomType

    console.log(room);
	

	useEffect(() => {
    
    
		dispatch(fetchingServices())
		dispatch(fetchRoomById(id))
		const getMatchingServices = () => {
			const matchingServices = ServicesRoom.map((serviceId: any) => {
			  return services.find((service: any) => service.id === serviceId);
			});
		
			setServiceName(matchingServices);
		  };
		
		  if (ServicesRoom.length > 0 && services.length > 0) {
			getMatchingServices();
		  }
		}, [services.length]);

		const [selectedImage, setSelectedImage] = useState(null);
		const [showOverlay, setShowOverlay] = useState(false);
	  
		
		const handleImageClick = (image: any) => {
			setSelectedImage(image);
			setShowOverlay(true);
		  };
		
		  const handleCloseOverlay = () => {
			setShowOverlay(false);
		  };
	
		  console.log(id);
		  const idRoom = id

    //DAR TRANSITION PARA QUE EL CARD DE UN TYPO DE CUARTO SE HAGA GRANDE CUANDO SE APRETE EN VER MAS

	return (
		<div>
			
			
				<div className='p-3 shadow-insetContainerTypeRooms  rounded-2xl'>
					<div>
						<div className='flex items-center text-center pb-2'>
							<h5 className=' text-lg font-bold w-full'>
								{roomType.room}
								<BsKey className='inline text-xl text-yellow-600 ml-2' />
							</h5>
						</div>
						<div className='grid grid-cols-2 text-center pt-2 pb-2'>
							<div className='flex items-center'>
								<h5 className='w-full text-sm'>
									<MdOutlineBedroomParent className='inline text-xl' /> Rooms {numRooms}
								</h5>
							</div>
							<div className='flex items-center'>
								<h5 className='w-full'>
									<MdPeopleOutline className='inline text-xl' /> Guests 4
								</h5>
							</div>
						</div>
						<div>
							<h5 className='text-center font-medium'>Services</h5>

							
								<ul className='px-10 grid grid-cols-2 justify-between'>
									{serviceName && serviceName?.map(c => (<li className=''>- {c.name}</li>))}
									
								</ul>
							
						</div>
					</div>
					<div className='py-2'>
						<div className='flex items-center pb-2 '>
							<h5 className=' font-medium '>Description</h5>
							<HiOutlineDocumentText className='text-xl ' />
						</div>

						<p className=' h-20 overflow-auto text-sm'>
							{description}
						</p>
					</div>
					<div>
						<div className='flex items-center pb-2 '>
							<h5 className=' font-medium '>Gallery</h5>
							<TfiGallery className='text-xl ml-2 ' />
						</div>
						<div className='m-1 max-h-64 overflow-scroll rounded-lg shadow-cardTypeRoom grid grid-cols-2 gap-2 p-2'>
				
			{room.gallery && room.gallery?.map((i: any, index: any)=> (
				<Image 
				className='rounded-xl'
				src={i.urlIMG}
				width={150}
				height={100}
				alt={`Image ${index}`}
				onClick={() => handleImageClick(i)}
				/>
				))}
				<GalleryDrop idHotel={hotelId} idRoom={id}/>
			</div>
				{showOverlay && (
        <ImageOptions image={selectedImage} onClose={handleCloseOverlay} />
      )}
					</div>
				</div>
				
			
		</div>
	);
};

export default ContainerTypesRooms;
