import { Fonts } from './SliderHotels';

const HotSaleSlider: React.FC<Fonts> = ({ roboto }) => {
	return (
		<div className=' grid grid-cols-2 mt-5 gap-5'>
			<div className='flex flex-col justify-between'>
				

				<div className='relative h-52 shadow-img rounded-3xl'>
					<img
						src='https://atomarpormundo.com/wp-content/uploads/2021/12/alojamiento-en-paris-citadines-1-1.jpg'
						alt=''
                        className=' rounded-3xl h-full object-cover'
					/>
					<div className={` text-white absolute bottom-0 w-full p-3 pb-0 h-20 leading-4`}>
						<h2 className={`${roboto.className} tracking-wide  text-sm `}>Paris Hob</h2>
						<div className='flex justify-between items-center'>
							<h2 className={`${roboto.className} tracking-wider text-sm`}>Paris</h2>
							<h3>$100</h3>
						</div>
						<div className='flex justify-between items-center text-xs'>
							<p className=''>Francia</p>
							<p className=''>/per night</p>
						</div>
					</div>
                    
				</div>
                <div className=' bg-orangeBg w-full text-white h-24 mt-5 rounded-3xl shadow-img flex justify-center items-center'>
                   
                   <div className='w-full text-center text-sm'>
                    <p className='w-full'>Holiday Deals</p>
                    <p className='w-full'>50% off</p>
                    </div> 
                </div>
			</div>
			<div className='flex flex-col justify-between'>
				<div className=' bg-orangeBg w-full h-24 text-white mb-5 rounded-3xl shadow-img flex justify-center items-center'>
                <div className='w-full text-center text-sm'>
                    <p className='w-full'>Holiday Deals</p>
                    <p className='w-full'>50% off</p>
                    </div> 
                </div>

				<div className='relative  h-52 shadow-img rounded-3xl'>
					<img
						src='https://www.mexicodestinos.com/blog/wp-content/uploads/2013/07/ventanas-al-paraiso-los-cabos.jpeg'
						alt=''
                        className=' rounded-3xl h-full object-cover'
					/>
					<div className={` text-white absolute bottom-0 w-full p-3 pb-0 h-20 leading-4`}>
						<h2 className={`${roboto.className} tracking-wide  text-sm `}>Pink Coco</h2>
						<div className='flex justify-between items-center  '>
							<h2 className={`${roboto.className} tracking-wider text-sm`}>Bali</h2>
							<h3>$92</h3>
						</div>
						<div className='flex justify-between items-center text-xs'>
							<p className=''>Bali</p>
							<p className=''>/per night</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotSaleSlider;
