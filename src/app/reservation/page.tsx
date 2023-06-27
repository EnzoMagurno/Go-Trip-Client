'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import React, { useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'

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

const page = (props: PageProps): React.ReactNode => {

    const [onApprove, setOnApprove] = useState(false)

    const [hotel, setHotel] = useState<Hotel>()
    const [perDay, setPerDay] = useState<number>(250);
    const [stay, setStay] = useState<number>(1);
    const [originalPerDay, setOriginalPerDay] = useState<number>(250);
    const [taxesAndServices] = useState<number>(60)
    const id = '86491666-1669-4ee5-b467-4282b2713c7b'
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const paypalId = "AdlpFWNaQPd5hGxdq6ybyz16wT-vyJ4hpqPOt7bpBQgQY7sBUY1FMTiwtDvrdXeecy607N3U2JkK2D9E"

    const amount = '13.99'
    const total = '1'
    const currency = hotel?.destination.moneyType || ''


    console.log(hotel);
    useEffect(() => {
        fetch(`http://localhost:3001/hotel/findhotel/${id}`)
            .then(response => response.json())
            .then(data => setHotel(data))
    }, [])
    useEffect(() => {
        const subtotal = stay * originalPerDay;
        const total = subtotal + taxesAndServices;
        setTotalAmount(total);
    }, [stay, originalPerDay, taxesAndServices]);

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

                {/* <div className={`${josefin.className} mt-4 flex flex-col pl-5`}>
                    <p className={`${asap.className} mb-2 mt-2 text-gray-500 font-semibold `}>
                        Stay information
                    </p>
                    <p>Dec 11-15 (4 nights)</p>
                    <p>1 Room, 2 Guests</p>
                    <p>1 King bed, gest room, Non-Smoking</p>
                </div> */}
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
                    const stayValue = !isNaN(value) && value !== 0 ? value : 1; // Restablecer a 1 si el valor no es válido
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
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                </select>
            </div>


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
                <p>{stay * originalPerDay + taxesAndServices} {currency}</p>
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
                <PayPalScriptProvider options={{ clientId: paypalId }}>
                    <PayPalButtons
                        disabled={false}
                        forceReRender={[amount, currency]}
                        fundingSource={undefined}
                        createOrder={(data, actions) => {
                            return actions.order
                                .create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: currency,
                                                value: totalAmount.toString(),

                                            }
                                        },
                                    ]
                                })
                                .then((orderId) => {
                                    // Your code here after create the order
                                    return orderId;
                                });
                        }}
                        onApprove={function (data: Record<string, unknown>, actions) {
                            return actions.order?.capture?.().then(function () {
                                // Your code here after capture the order
                                setOnApprove(true)
                            });
                        }
                        } onCancel={function (data: Record<string, unknown>, actions) {
                        }}
                    />
                </PayPalScriptProvider>
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