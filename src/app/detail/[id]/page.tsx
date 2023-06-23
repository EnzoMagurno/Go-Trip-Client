'use client'
import axios from 'axios';
import { Josefin_Sans, Roboto } from 'next/font/google';
import StarRating from '@/components/StarRaiting/StarRaiting';
import { AiOutlineMessage, } from "react-icons/ai";
import { BsArrowLeft, BsFillHeartFill } from "react-icons/bs";


const RobotoBold = Roboto({
    weight: ['700'],
    subsets: ['latin'],
})

const josefinBold = Josefin_Sans({
    weight: ['700'],
    subsets: ['latin'],
});
const josefinSemiBold = Josefin_Sans({
    weight: ['600'],
    subsets: ['latin'],
});
const josefinRegular = Josefin_Sans({
    weight: ['400'],
    subsets: ['latin'],
});
const josefinLight = Josefin_Sans({
    weight: ['300'],
    subsets: ['latin'],
});

const rating = 4


const host = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

// type Hotel = {
//     id: string
//     name: string,
//     destination: object
//     overview: string

// }

// export const hotelApi = createApi({
//     reducerPath: 'userApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:3001/hotel/'
//     }),
//     endpoints:(builder)=> ({
//         getHotel: builder.query<Hotel[], null>({
//             query: () => 'findhotel'
//         }),
//         getHotelById: builder.query<Hotel, {id:string}>({
//             query: ({id}) => `findhotel/${id}`
//         })
//     })
// })

const hotelId = async (id: number) => {
    const response = await axios.get(`http://localhost:4000/hotels`);

    return response.data
}



export default async function Detail({ params }) {
    const { id } = params
    const response = await hotelId(id)
    const hotel = response.find(h => h.hotel_id == id)
    console.log(hotel);


    return (

        <div className=" ">
            <BsArrowLeft className='fixed top-5 left-5 text-4xl text-white z-40 ' />
            <BsFillHeartFill className='fixed top-7 right-5 text-2xl text-white z-40 ' />
            <img src={hotel.photo1} alt='prueba' className=" fixed w-full -top-30" />
            <div className="absolute h-3/4 bottom-0 rounded-3xl ">
                <div className='px-5 pt-9 pb-5 bg-slate-100 rounded-3xl'>
                    <section className="">
                        <h1 className={`${josefinBold.className} text-2xl`}>{hotel.hotel_name}</h1>
                        <h2 className={`${josefinRegular.className} text-xs`}>des</h2>

                        <div>
                            <StarRating rating={rating} />
                        </div>
                        <div className='absolute top-16 pt-1 pr-5 right-0'>
                            <h1 className={`${RobotoBold.className} text-3xl`}>{`$${hotel.rates_from}`}</h1>
                            <h1 className={`${josefinRegular.className} -mt-2 text-base`}>/per night</h1>
                        </div>
                    </section>
                    <hr className='mt-4 ' />
                    <section className=''>
                        <p className={`${josefinLight.className} text-base mt-4  leading-4`}>{hotel.overview}</p>
                    </section>
                    <section className='mt-3'>
                        <h1 className={`${josefinBold.className} text-lg`}>Hosted by</h1>
                        <div className='flex flex-wrap gap-3 w-full '>
                            <img src={host} alt='prueba' className="mt-2 h-16 w-16 rounded-full" />
                            <div>
                                <h1 className={`${josefinSemiBold.className} mt-5`}>Alber Smith</h1>
                                <h1 className={`${josefinLight.className}`}>Chain name</h1>
                            </div>
                            <div className='absolute  bg-iconsPurple w-10 h-10 rounded-2xl mt-4 right-5' >
                                <AiOutlineMessage className='m-auto mt-2 h-5 w-5 text-white' />
                            </div>
                        </div>
                    </section>
                    <button className='mt-5 h-10 rounded-full w-full bg-iconsPurple text-white '>Book now</button>
                </div>
            </div>
        </div>
    )
}