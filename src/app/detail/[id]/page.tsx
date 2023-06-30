'use client'

import { Josefin_Sans, Roboto } from 'next/font/google';
import StarRating from '@/components/StarRaiting/StarRaiting';
import { AiOutlineMessage, } from "react-icons/ai";
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchinHotelId } from '@/redux/Features/Hotel/hotelsSlice';
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation';
import { TbHomeCancel } from 'react-icons/tb'


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

const Rooms = (room) =>
    <div className='bg-gray-400 border rounded-lg overflow-hidden'>
        {/* <img src="" alt="Hotel Image" className='flex justify-start items-start' /> */}
        <h2>Room </h2>
        <div>
            <p>Room description</p>
            <p>Room $Price</p>
            <p>Room Amount</p>
        </div>
    </div>


const NoRooms = () =>
    <div className='pl-5 flex'>
        <TbHomeCancel /><p>No rooms available</p>
    </div>

// type Hotel = {
//     id: string
//     name: string,
//     destination: object
//     overview: string
//     state: { hotel: {} }
// }
interface Params {
    id: string
}

const Detail = ({ params }: { params: Params }) => {
    const { id } = params
    const router = useRouter()
    // console.log(router);
    console.log(id);
    const dispatch: Dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchinHotelId(id))
        fetch(`http://localhost:3001/hotel/findHotel/${id}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5YzQxYzYzYS1hNDA5LTQwZTQtYjJkYi1kZjQ2MjRiYjdiYmYiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTY4ODEzNzg1NCwiZXhwIjoxNjg4MTQ1MDU0fQ.ygSfrif326u09F3-PCm9c3kGM4no5KSE7sLcRnBiTD4`,
                'Content-Type': 'application/json',
            },
            // Resto de los parámetros de la solicitud...
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const hotel = useSelector(state => state.hotel.hotel)
    console.log(hotel)

    return (
        <>
            <div className='relative flex items-center justify-center'>
                <div className="flex justify-center">
                </div>
                <img src={hotel.image} alt='Hotel' className={`${hotel.image ? 'w-full' : 'hidden'}`} />
                <div className='bg-gray-900 opacity-80 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full'>
                    <h3 className="text-center">{hotel.name}</h3>
                    <h4 className="text-center">{hotel.destination && hotel.destination.city}</h4>
                    <p className="text-center">{hotel.destination && hotel.destination.country}</p>
                </div>
            </div>

            <h2 className='flex justify-center text-2xl mt-3'>Book now</h2>
            {hotel.rooms && hotel.rooms.length ? (<Rooms />) : (<NoRooms />)}
            <a onClick={() => router.push(`http://localhost:3000/reservation/${id}`)}></a>

            <div className='flex flex-col justify-center pl-5 mt-6'>
                <h3>About hotel</h3>
                <p className=''>{hotel.overview}</p>
            </div>
        </>
    )
}
export default Detail