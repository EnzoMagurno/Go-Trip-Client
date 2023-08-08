'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchinHotelId } from '../../../redux/Features/Hotel/hotelsSlice';
import { fetchRoomById } from '../../../redux/Features/Room/RoomSlice';
import { useRouter } from 'next/navigation'
import MercadoPago from '../../../../public/mercado-pago.svg'
import Image from 'next/image'
import { BsCheckCircleFill } from "react-icons/bs"

interface PageProps {
    params: object,
    searchParams: object,
    hotel: {
        name: string,
        image: string,
        destination: {
            city: string,
            moneyType: string
        }
    }
}
interface User {
    address?: string,
    birthday: string,
    confirmPassword: string,
    country: string,
    dniPassport?: string
    email: string,
    gender?: string,
    name: string,
    password: string,
    phone: string,
    phoneCode: string,
    photoUser: string[],
    postalCode: string,
    rol: string
    thirdPartyCreated: boolean
}

const page = (props: PageProps): React.ReactNode => {


    const [tokenSession, setTokenSession] = useLocalStorage('token', '');
    const [idSession, setIdSession] = useLocalStorage('idSession', '')
    const [userNameSession, setUserNameSession] = useLocalStorage('username', '');
    const [userSession, setUserSession] = useLocalStorage<User>('userData', {})
    console.log(userSession, 'ESTO ES USERSESSION');
    console.log(idSession, 'esto es idsession');

    const { params, searchParams } = props
    const router = useRouter()


    useEffect(() => {
        dispatch(fetchinHotelId(params.id))
        dispatch(fetchRoomById(searchParams.room))
    }, [])

    const hotel = useSelector(state => state.hotel.hotel)
    const room = useSelector(state => state.room.room)

     console.log(room);
    console.log(hotel, 'hotel'); 

    

    const dispatch = useDispatch()

    const [perDay, setPerDay] = useState<number>(200)

    useEffect(() => {
        if (room && room.price) {
            setPerDay(room.price)
        }
    }, [room])

    const [stay, setStay] = useState<number>(1);
    const [taxesAndServices] = useState<number>(60)
    const [totalAmount, setTotalAmount] = useState<number>(0);
    

    const currency = room?.destination?.moneyType || ''
    const [ BookingMadeIt, setBooking ] = useState({ status: false })
    useEffect(() => {
        const subtotal = stay * perDay;
        const total = subtotal + taxesAndServices;
        setTotalAmount(total);
    }, [stay, perDay, taxesAndServices, room.price]);
    const pago = stay * perDay + taxesAndServices;
    console.log('perday', pago);

    const handlePayment2 = async (): Promise<void> => {
        try {
            const data = {
                "userId": `${idSession}`,
                "bookingId": crypto.randomUUID(),
                "name": `${userNameSession}`,
                "email": `${userSession.email}`,
                "reserva": [
                    {
                        "id": 1,
                        "nombre": `Estadía en ${room.room}`,
                        "precio": pago,
                        "cantidad": 1
                    }
                ]
            };
            const mercadoPagoResponse = await axios.post('/urlPago/mercadoPago', data, {
                headers: {
                    'Authorization': `Bearer ${tokenSession}`
                }
            });
            const linkPay = mercadoPagoResponse.data.linkPago
            if (mercadoPagoResponse.status === 200) setBooking({ status: true })
            console.log(linkPay);
            window.open(linkPay, '_blank')
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <div className=' overflow-y-auto'>
                <div className='pl-5 flex w-full h-14'>
                    <div className=' flex justify-start items-center w-1/4'>
                        <Link href='' onClick={() => { router.back() }}>
                            <BsArrowLeftShort className='text-5xl' />
                        </Link>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='font-semibold'>Review Reservation</p>
                    </div>
                </div>

                <div className='flex justify-center p-5'>
                    {hotel?.image && <img className='max-w-full rounded-3xl' src={hotel.image} alt={room.name} />}
                </div>

                <div className='flex justify-center flex-col items-center mt-2'>
                    <h4 className='font-semibold text-2xl'>{room?.room}</h4>
                    <p className='font-semibold'>{hotel?.destination?.city}</p>
                </div>
            </div>

            <div className='flex justify-center'>
                <hr className='w-[90%] my-3 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>
            <p className={` text-gray-500 font-semibold pl-5 mb-4`}>
                Summary of charges
            </p>
            <div className={` flex justify-center`}>
                <button onClick={() => stay > 1 && setStay(stay - 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <span className='text-2xl pl-2 pr-2'>{stay}</span>
                <button onClick={() => setStay(stay + 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>

            </div>

            <div className='flex justify-start pl-5 mt-3 mb-3'>
            </div>
            <div className='pl-5 grid grid-cols-2 gap-4'>
                <h3>Per day: </h3>
                <p className='text-gray-500'>{perDay}</p>
                <p>Days of stay</p>
                <p>{stay}</p>
                <p>Service charges</p>
                <p>20 USD</p>
                <p>Taxes and fee</p>
                <p>40 USD</p>
            </div>

            <div className='flex justify-center'>
                <hr className='w-[90%] my-2 h-0.5 border-t-0 bg-orange-300 opacity-40 dark:opacity-50' />
            </div>
            <div className='pl-5 grid grid-cols-2 gap-4'>
                <p>Total stay</p>
                <p>{pago} {currency}</p>
            </div>


            <div className='flex-col justify-start pl-5 w-[90%]'>
                <h3 className={` mb-2 text-gray-500 mt-6 font-semibold`}>
                    Additional charges
                </h3>
                <p>
                    Complimentary on-site parking
                </p>
                <p>
                    Changes in taxes and fees will aff affect the total room price
                </p>
            </div>

            <div className='flex justify-center'>
                <hr className='w-[90%] mt-6 mb-2 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>

           

            {
                BookingMadeIt.status 
                ? ( <div className='w-full '>
                <div className='w-full flex items-center justify-center '> < BsCheckCircleFill className=' text-green-800 text-8xl text-center'/></div>
               
            <h5 className='text-lg text-center mt-3 font-medium w-full'>Successful reservation!</h5>
            </div>) 
                : (
                    <div>
                    <div> <h3 className={` flex justify-center mb-4 text-gray-500 mt-3 font-semibold`}>
                    Book now!
                </h3></div>
                    <div onClick={handlePayment2} className="flex justify-center outline-1 rounded-xl w-full ">
                    <div className='w-full flex justify-center '>
                        <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-xl focus:outline-none hover:bg-blue-600">
                            Pagar con
                            <Image className="w-14 ml-2" src={MercadoPago} alt="" />
                        </button>
                    </div>
                </div>
                </div>
                )
            }
          

            {/* PAYMENT METHOD */}
            <div className='flex justify-center -z-10'>

            </div>

            <div className='mt-8'>
                <h3 className={` font-semibold text-gray-500 mb-2 pl-5`}>Modifying</h3>
                <p className='text-center'>Any change in the length or dates of a reservation may result in a rate change</p>

            </div>
            <div className='flex justify-center'>
                <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>

            <div className='flex flex-col w-[80%] pl-5 mb-20'>
                <h3 className={` font-semibold  mb-2  text-gray-500`}>
                    Cancellation policy
                </h3>
                <p>
                    You may cancel your reservation for no charge, before 3 days arrival. Please note that we will assess a fee of 810 USD if you must cancel after this deadline.
                </p>
            </div>
        </>
    )
}

export default page