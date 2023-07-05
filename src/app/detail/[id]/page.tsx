'use client'

import { Josefin_Sans, Roboto } from 'next/font/google';
import StarRating from '@/components/StarRaiting/StarRaiting';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchinHotelId } from '@/redux/Features/Hotel/hotelsSlice';
import React, { useEffect } from "react"
import { useRouter } from 'next/navigation';
import { TbHomeCancel } from 'react-icons/tb'
import { AiFillBook } from 'react-icons/ai'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import Link from 'next/link'


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





type Hotel = {
    id: string
    name: string,
    destination: object
    overview: string
    state: { hotel: {} }
    rooms?: []
    room: {
        room: object
        description?: string,
        price?: number,
        numRooms?: number
    }
}
interface Params {
    id: string
}

const Detail = ({ params }: { params: Params }) => {
    const { id } = params
    const router = useRouter()

    console.log(id);
    const dispatch: Dispatch = useDispatch()
    const Room = ({ room }: Hotel) => (
        < div className="bg-gray-300 border rounded-lg overflow-hidden mt-4" >
            <div className="p-4">
                <h2 className="text-xl font-semibold">{room.room}</h2>
                <p className="text-gray-500">{room.description}</p>
                <p className="text-gray-500">Price: ${room.price}</p>
                <p className="text-gray-500">Available Rooms: {room.numRooms || 'N/A'}</p>
                <div className='flex justify-center items-center mt-3'>

                    <Link href={{ pathname: `/reservation/${id}`, query: { room: room.id } }}>
                        <span className="w-full mt-4 text-center bg-[#3F0071] hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Book here</span>
                    </Link>

                </div>
            </div>
        </div >
    );
    const Rooms = ({ rooms }: Hotel) => (
        <div>
            <h2 className="flex justify-center text-2xl mt-3">{rooms?.length
                ?
                <div className='flex items-center'>
                    <BsFillJournalBookmarkFill />
                    <span className='pl-2'>Book now</span>
                </div>
                :
                null}
            </h2>
            {rooms?.length ? (
                <div>
                    {rooms.map((room: string, index: number) => <Room key={index} room={room} />)}
                </div>
            ) : (
                <NoRooms />
            )}
        </div>
    );

    const NoRooms = () => (
        <div className=" flex items-center justify-center text-xl mt-3">
            <TbHomeCancel />
            <p className='pl-2'>No rooms available</p>
        </div>
    );

    useEffect(() => {
        dispatch(fetchinHotelId(id))
    }, [])

    const hotel = useSelector(state => state.hotel.hotel)
    console.log(hotel)

    return (
        <div className='max-w-screen-xl mx-auto flex flex-col'>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={hotel.image} alt="Hotel" className="w-full" />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <h4 className="text-gray-500">{hotel.destination && hotel.destination.city}</h4>
                    <p className="text-gray-500">{hotel.destination && hotel.destination.country}</p>
                    <div className="flex flex-col justify-start mt-4">
                        <span className="text-gray-700 font-bold">Check-in <span className='pl-2'>{hotel.checkIn}</span></span>
                        <span className="text-gray-700 font-bold">Check-out <span className='pl-2'>{hotel.checkOut}</span></span>
                    </div>
                </div>
            </div>

            {hotel.rooms && hotel.rooms.length ? (
                <Rooms rooms={hotel.rooms} />
            ) : (
                <NoRooms />
            )}

            <div className="mt-6 px-5">
                <h3 className="text-2xl font-bold mb-2">About the hotel</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{hotel.overview}</p>
            </div>

        </div>
    )
}
export default Detail