import Link from "next/link";

const ContainerResult = (props) => {

	const { 
        id,
        name, 
        img, 
        reviews, 
        rating, 
        cost, 
        roboto, 
        city, 
        state, 
        country 
    } = props
    
    
    return (
        <>
        <Link href={`detail/${id}`}>
        
        	<div className='relative h-60'>
            
			<img src={img} alt={name} className=' w-full rounded-3xl h-full shadow-img' />
			<div className='absolute bottom-0 text-white p-4 flex  w-full'>
                <div className="w-3/4">
                <h2 className={`${roboto.className} tracking-wider`}>{name}</h2>
                <h2 className={`${roboto.className} tracking-wider`}>{city}</h2>
                <p className=" text-xs">Calificacion: {rating}, {reviews} reviews</p>
                
                <p className=" text-little">{state}, {country}</p>
                </div>
				<div className="w-1/4 flex flex-col justify-end items-end ">
                <p className="block ">${cost}</p>
                <p className=" block text-little">/per night</p>
                </div>
			</div>
		</div>
        </Link>
        </>
	
	);
};

export default ContainerResult;
