'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import React, { useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchinHotelId } from '../../../redux/Features/Hotel/hotelsSlice';
import { fetchRoomById } from '../../../redux/Features/Room/RoomSlice';
import { useRouter } from 'next/navigation'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';
const asap = Asap({ subsets: ['latin'] })
const josefin = Josefin_Sans({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['100'], subsets: ['latin'] })



const Page = (props: any): React.ReactNode => {



  

    const [tokenSession, setTokenSession] = useLocalStorage('token', '');
    const [idSession, setIdSession] = useLocalStorage('idSession', '')
    console.log(idSession);
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const { params, searchParams } = props
    const router = useRouter()
    console.log(router);
    useEffect(() => {
        dispatch(fetchinHotelId(params.id))
        dispatch(fetchRoomById(searchParams.room))
    }, [])
    const hotel = useSelector((state: any) => state.hotel.hotel)
    const room = useSelector((state: any) => state.room.room)
    console.log(room);
    console.log(hotel, 'hotel');

    

    const [perDay, setPerDay] = useState<number>(0)
    console.log('perday', perDay);

    useEffect(() => {
        if (room && room.price) {
            setPerDay(room.price)
        }
    }, [room])

    const [stay, setStay] = useState<number>(1);
    const [taxesAndServices] = useState<number>(60)
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const currency = room?.destination?.moneyType || ''

    useEffect(() => {
        const subtotal = stay * perDay;
        const total = subtotal + taxesAndServices;
        setTotalAmount(total);
    }, [stay, perDay, taxesAndServices]);
    const pago = stay * perDay + taxesAndServices;


    const handlePayment2 = async () => {
        try {



           


            const data = {
                "userId": "69e3f4f3-1e33-4f22-bbd0-8c9264609890",
                "bookingId": "8893a44a-ff2c-4e43-90b0-c9acc6c66cd4",
                "name": "Joselito joselito",
                "email": "mcdany996@gmail.com",
                "reserva": [
                    {
                        "id": 1,
                        "nombre": "Camiseta",
                        "precio": 29.99,
                        "cantidad": 200
                    }
                ]
            };
            const mercadoPagoResponse = await axios.post('/urlPago/mercadoPago', data, {
                headers: {
                    'Authorization': `Bearer ${tokenSession}`
                }
            });
            console.log(mercadoPagoResponse.data.linkPago);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <div className=' overflow-y-auto'>
                <div className='pl-5 flex w-full h-28'>
                    <div className=' flex justify-start items-center w-1/4'>
                        <Link href='' onClick={() => router.back()}>
                            <BsArrowLeftShort className='text-5xl' />
                        </Link>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='font-semibold'>Review Reservation</p>
                    </div>
                </div>

                <div className='flex justify-center'>
                    {hotel?.image && <img className='max-w-[80%] rounded-3xl' src={hotel.image} alt={room.name} />}
                </div>

                <div className='flex justify-center flex-col items-center mt-2'>
                    <h3 className='font-semibold text-2xl text-center'>{room?.description}</h3>
                    <h4 className='font-semibold text-2xl'>{room?.room}</h4>
                    <p className='font-semibold'>{hotel?.destination?.city}</p>
                </div>
            </div>

            <div className='flex justify-center'>
                <hr className='w-[90%] my-3 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>
            <p className={`${asap.className} text-gray-500 font-semibold pl-5 mb-4`}>
                Summary of charges
            </p>
            <div className={`${josefin.className} flex justify-center`}>
                <button onClick={() => stay > 1 && setStay(stay - 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <span className='text-2xl pl-2 pr-2'>{stay}</span>
                <button onClick={() => setStay(stay + 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>

            </div>

            <div className='flex justify-start pl-5 mt-3 mb-3'>
                <h3>Per day: {perDay}</h3>
            </div>
            <div className='pl-5 grid grid-cols-2 gap-4'>
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
                <h3 className={`${asap.className} mb-2 text-gray-500 mt-6 font-semibold`}>
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
                <hr className='w-[90%] my-6 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>

            <h3 className={`${asap.className} flex justify-center mb-4 text-gray-500 mt-6 font-semibold`}>
                Book now!
            </h3>
            <div className='flex justify-center'>
                <button onClick={handlePayment2}>Pagar con MercadoPago</button>
            </div>

            {/* PAYMENT METHOD */}
            <div className='flex justify-center -z-10'>
                {/* <PayPalScriptProvider options={{ clientId: paypalId }}>
                    <PayPalButtons
                        disabled={false}
                        forceReRender={[amount, currency]}
                        fundingSource={undefined}
                        createOrder={(data, actions) => {
                            return axios.post('/urlPaypal/newOrder', {
                                purchase_units: [
                                    {
                                        amount: {
                                            currency: currency,
                                            value: pago.toString(),
                                        },
                                    },
                                ],
                                paymentStatus: 'pending',
                            })
                                .then((orderId) => {
                                    // Tu código aquí después de crear la orden
                                    return orderId;
                                });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order?.capture?.().then(() => {
                                // Tu código aquí después de capturar la orden
                                setOnApprove(true);
                            });
                        }}
                    />
                </PayPalScriptProvider> */}


            </div>

            <div className='mt-8'>
                <h3 className={`${asap.className} font-semibold text-gray-500 mb-2 pl-5`}>Modifying</h3>
                <p className='text-center'>Any change in the length or dates of a reservation may result in a rate change</p>

            </div>
            <div className='flex justify-center'>
                <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>

            <div className='flex flex-col w-[80%]  pl-5'>
                <h3 className={`${asap.className} font-semibold  mb-2  text-gray-500`}>
                    Cancellation policy
                </h3>
                <p>
                    You may cancel your reservation for no charge, before 3 days' arrival. Please note that we will assess a fee of 810 USD if you must cancel after this deadline.
                </p>
            </div>
        </>
    )
}

export default Page;