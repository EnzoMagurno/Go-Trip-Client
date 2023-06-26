
import { MdOutlineBedroomParent, MdPeopleOutline } from 'react-icons/md';
import { BsKey } from 'react-icons/bs';
import { TfiGallery } from 'react-icons/tfi';
import { roboto } from '../../app/page';
import { HiOutlineDocumentText } from 'react-icons/hi';

import { useRouter } from "next/navigation"
const ContainerTypesRooms = () => {

    const router = useRouter()

    //DAR TRANSITION PARA QUE EL CARD DE UN TYPO DE CUARTO SE HAGA GRANDE CUANDO SE APRETE EN VER MAS

	return (
		<div
			className={`${roboto.className} border-t border-zinc-400 border-solid`}
		>
			<h3 className='mt-3 mb-3 text-lg font-bold text-iconsPurple'>
				Types Rooms
			</h3>

			<div className=' shadow-insetContainerTypeRooms pb-5 rounded-2xl h w-ful grid grid-cols-1 gap-3'>
				<div className='p-3 shadow-cardTypeRoom  rounded-2xl'>
					<div>
						<div className='flex items-center text-center pb-2'>
							<h5 className=' text-lg font-bold w-full'>
								Familiar Sencilla
								<BsKey className='inline text-xl text-yellow-600 ml-2' />
							</h5>
						</div>
						<div className='grid grid-cols-2 text-center pt-2 pb-2'>
							<div className='flex items-center'>
								<h5 className='w-full text-sm'>
									<MdOutlineBedroomParent className='inline text-xl' /> Rooms 30
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

							<div className='grid grid-cols-2 pt-2 pb-2 text-sm'>
								<ul className='flex flex-col'>
									<li className=''>- Clima</li>
									<li className=''>- 2 bathrooms</li>
									<li className=''>- Parking</li>
									<li className=''>- Tv 75 inches</li>
								</ul>
								<ul className='flex flex-col'>
									<li className=''>- Clima</li>
									<li className=''>- 2 bathrooms</li>
									<li className=''>- Parking</li>
									<li className=''>- Tv 75 inches</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='pb-2'>
						<div className='flex items-center pb-2 '>
							<h5 className=' font-medium '>Description</h5>
							<HiOutlineDocumentText className='text-xl ' />
						</div>

						<p className=' h-20 overflow-auto text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Dignissimos at repudiandae quos, porro consequatur eos culpa
							expedita molestiae repellat molestias, quis necessitatibus
							obcaecati inventore blanditiis. Earum hic rerum asperiores at?
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
				<div className='flex justify-center items-center'>
					<div className=" flex flex-wrap justify-center items-center">
						<button onClick={() => router.push("/createRoom")} className='relative border-2 border-green-600 w-10 h-10 flex justify-center items-center rounded-full shadow-buttonAdd'>
							<div className='absolute border border-green-600 h-6 inline'></div>
							<div className='absolute border border-green-600 h-6 inline transform rotate-90'></div>
						</button>
                        <h5 className='w-full text-center text-sm pt-2'>Add new room</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContainerTypesRooms;
