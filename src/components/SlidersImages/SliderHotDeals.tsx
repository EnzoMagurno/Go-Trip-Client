import { Fonts } from './SliderHotels';

const SliderHotDeals: React.FC<Fonts> = ({ roboto }) => {
	return (
		<div className=' mt-3 mb-3'>
			<h2 className={`${roboto.className} text-subTitle mb-3`}>Hot Deals</h2>
			<div className='h-52 relative'>
				<div className='absolute bottom-0 text-white w-full pl-3 pr-3 h-12 '>
					<div className='bg-slate-600 w-full h-full left-0 opacity-50 absolute rounded-bl-3xl rounded-br-3xl'></div>
					<div className='flex justify-between'>
						<h2 className={`${roboto.className} relative z-50 flex justify-center items-center`}>Riviera Maya</h2>
						<h2 className={`${roboto.className} text-little relative text-base z-50 flex justify-center items-center`} >$250</h2>
					</div>
					<div className='flex justify-between'>
						<p className={`text-little relative z-50 flex justify-center items-center `}>Mexico</p>

						<p className='text-little relative z-50 flex justify-center items-center'>per night</p>
					</div>
				</div>
				<img
					src='https://coyotitos.com/wp-content/uploads/2015/05/consejos-elegir-resorts-todo-incluido.jpg'
					alt='cabos'
					className=' rounded-3xl h-full w-full object-cover shadow-img'
				/>
			</div>
		</div>
	);
};

export default SliderHotDeals;
