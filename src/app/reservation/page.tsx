'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import React, { useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'
import { DatePicker } from 'antd'
import { Dayjs } from 'dayjs'
import axios from 'axios'

const asap = Asap({ subsets: ['latin'] })
const josefin = Josefin_Sans({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['100'], subsets: ['latin'] })

interface PageProps {
    params: {}
    searchParams: {}
    hotel: {}
}
interface Hotel {
    name: string
    image: string
    destination: {
        city: string
        moneyType: string
    }
}



const handleDateChange = (value: Dayjs | null, fieldName: string) => {
    const dateValue = value?.format('DD-MM-YYYY');
};
const page = (props: PageProps): React.ReactNode => {

    const [onApprove, setOnApprove] = useState(false)

    const [hotel, setHotel] = useState<Hotel>()
    const [perDay, setPerDay] = useState<number>(250);
    const [stay, setStay] = useState<number>(1);
    const [originalPerDay, setOriginalPerDay] = useState<number>(250);
    const [taxesAndServices] = useState<number>(60)
    const id = 'fd150709-4c7f-4033-bcbd-d5b4e1a858ff'
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const paypalId = "AdlpFWNaQPd5hGxdq6ybyz16wT-vyJ4hpqPOt7bpBQgQY7sBUY1FMTiwtDvrdXeecy607N3U2JkK2D9E"

    const amount = '13.99'
    const total = '1'
    const currency = hotel?.destination.moneyType || ''

    console.log(totalAmount);
    useEffect(() => {
        fetch(`http://localhost:3001/hotel/findhotel/${id}`)
            .then(response => response.json())
            .then(data => setHotel(data))
    }, [])
    useEffect(() => {
        const subtotal = stay * perDay;
        const total = subtotal + taxesAndServices;
        setTotalAmount(total);
    }, [stay, perDay, taxesAndServices]);
    const pago = stay * perDay + taxesAndServices;


    const handlePayment = () => {
        axios.post('/urlPago/mercadoPago',
            {
                "carrito": [
                    {
                        "nombre": "Compu re buena",
                        "precio": 1,
                        "cantidad": 1
                    }
                ],
                // "bookingId": "ABC123",
                // "userId": "12345"
            },
        )
            .then((response) => {
                console.log(response.data);
                window.location.href = `${response.data}`;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className=' overflow-y-auto'>
                <div className='pl-5 flex w-full h-28'>
                    <div className=' flex justify-start items-center w-1/4'>
                        <Link href=''>
                            <BsArrowLeftShort className='text-5xl' />
                        </Link>
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='font-semibold'>Review Reservation</p>
                    </div>
                </div>

                <div className='flex pl-5'>
                    {hotel?.image && <img className='w-[45%] rounded-3xl' src={hotel.image} alt={hotel.name} />}
                    {/* {hotel?.image && <Image className='w-1/6 rounded-3xl' src={hotel.image} alt={hotel.name} width={500} height={300} />} */}
                    <div className='pl-3'>
                        <h1 className='font-semibold text-2xl'>{hotel?.name}</h1>
                        <p className='font-semibold'>{hotel?.destination.city}</p>
                    </div>
                </div>

            </div>

            <div className='flex justify-center'>
                <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
            </div>
            <p className={`${asap.className} text-gray-500 font-semibold pl-5 mb-4`}>
                Summary of charges
            </p>
            <div className={`${josefin.className} pl-5 flex justify-start`}>
                <select value={stay} onChange={(e) => {
                    const value = +e.target.value;
                    const stayValue = !isNaN(value) && value !== 0 ? value : 1;
                    setStay(stayValue);
                }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>

                </select>
            </div>

            <form className=''>
                <DatePicker
                    onChange={value => handleDateChange(value, 'birthday')}
                    name='check-in'
                />
            </form>

            <div className='flex justify-start pl-5'>
                <h3>Per day: 250 USD</h3>
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


            <div>
                <button onClick={handlePayment}>Pagar con MercadoPago</button>
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

            <div className='pl-5 mt-8'>
                <h3 className={`${asap.className} font-semibold text-gray-500 mb-2`}>Modifying</h3>
                <p>Any change in the length or dates of a reservation</p>
                <p>may result in a rate change</p>
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

export default page