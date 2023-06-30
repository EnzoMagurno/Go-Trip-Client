import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { MdOutlineBedroomParent, MdPeopleOutline } from 'react-icons/md';
import { BsKey } from 'react-icons/bs';
import { TfiGallery } from 'react-icons/tfi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { fetchingServices } from '@/redux/Features/Services/servicesSlice';
import { MainGlobal } from '@/redux/mainInterface';


export interface MyRoom {
	id: string
		room: string
		price: number
		numRooms: number
		roomsInUse: number
		description: string
		status: boolean
		ServicesRoom: string[]
		hotelId: string
}

export interface RoomProps {
	roomType: MyRoom
}

const ContainerTypesRooms = ({ roomType }: RoomProps) => {

	
	const dispatch = useDispatch()
	const [serviceName, setServiceName] = useState<string[]>([]);

	const services = useSelector((state: MainGlobal) => state.services.dataService)
	
	

	const {
		id, 
		room, 
		price, 
		numRooms, 
		roomsInUse, 
		description, 
		status, 
		ServicesRoom, 
		hotelId, 
	} = roomType

    

	useEffect(() => {
    
    
		dispatch(fetchingServices())
		const getMatchingServices = () => {
			const matchingServices = ServicesRoom.map((serviceId) => {
			  return services.find((service) => service.id === serviceId);
			});
		
			setServiceName(matchingServices);
		  };
		
		  if (ServicesRoom.length > 0 && services.length > 0) {
			getMatchingServices();
		  }
		}, [services.length]);

	
	
	console.log(services)
	console.log(ServicesRoom)
	console.log(serviceName)


    //DAR TRANSITION PARA QUE EL CARD DE UN TYPO DE CUARTO SE HAGA GRANDE CUANDO SE APRETE EN VER MAS

	return (
		<div>
			
			
				<div className='p-3 shadow-cardTypeRoom  rounded-2xl'>
					<div>
						<div className='flex items-center text-center pb-2'>
							<h5 className=' text-lg font-bold w-full'>
								{room}
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
						<img
							src='https://www.elmueble.com/medio/2022/11/06/dormitorio-rustico-con-vigas-de-madera-y-pared-de-madera-00557319_00000000_22116180616_900x900.jpg'
							alt='habitacion'
							className='w-20 object-cover rounded-lg'
						/>
					</div>
				</div>
				
			
		</div>
	);
};

export default ContainerTypesRooms;
