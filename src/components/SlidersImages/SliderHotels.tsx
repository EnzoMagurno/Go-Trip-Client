"use client"
const vegas =
	'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8a/e0/b9/bellagio-las-vegas.jpg?w=1200&h=-1&s=1';
const italia =
	'https://cf.bstatic.com/xdata/images/hotel/270x200/317806454.jpg?k=b6652391fac2074d5338ffaa4d2601124fe71ccd9beec29742e4037ac43055cd&o';



interface Font {
    className: string
}

interface SliderHoltels {
    roboto: Font
}

const SliderHotels: React.FC<SliderHoltels> = ({ roboto }) => {





	return (
		<div className='grid grid-cols-2 gap-5 h-52 mt-3'>
			<div className={`w-full relative shadow-img rounded-3xl`}>
                <div className='bg-black absolute z-10 w-full h-full opacity-30 rounded-3xl'></div>
                    <img
					src={vegas}
					alt='las vegas'
					className={`w-full h-full object-cover rounded-r-3xl rounded-l-3xl `}
				/>
				<div className='absolute bottom-0 text-white w-full pl-3 pb-3 z-30'>
					<h2 className={`${roboto.className}`}>Las Vegas</h2>
					<p className='text-little'>195 propertys</p>
				</div>
                </div>
				
			

			<div className='w-full relative shadow-img rounded-3xl'>
            <div className='bg-black absolute z-10 w-full h-full opacity-30 rounded-3xl'></div>
				<img
					src={italia}
					alt='roma'
					className='w-full h-full object-cover rounded-r-3xl rounded-l-3xl'
				/>
				<div className='absolute bottom-0 text-white  w-full pl-3 pb-3 z-30'>
                    
					<h2 className={`${roboto.className} tracking-widest`} >Roma</h2>
					<p className=' text-little'>115 propertys</p>
				</div>
			</div>
		</div>
	);
};

export default SliderHotels;
