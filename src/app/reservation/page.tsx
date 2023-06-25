'use client'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'


const page = (props: never) => {
    const { } = props
    return (
        <>
            <div className='z-10'>
                <div className='overflow-y-auto'>
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
                        <img className='w-1/6 rounded-3xl' src="https://media-cdn.tripadvisor.com/media/photo-s/1a/d3/63/3e/hotel-krystal-cancun.jpg" alt="hotel" />
                        <div className='pl-3'>
                            <h1 className='font-semibold'>Park Royal Beach</h1>
                            <p className='font-semibold'>Cancún</p>
                        </div>
                    </div>

                    <div className='pl-5 mt-5 flex-col justify-start'>
                        <p className='text-gray-500'>Stay information</p>
                        <p>Dec 11-15 (4 nights)</p>
                        <p>1 Room, 2 Guests</p>
                        <p>1 King bed, gest room, Non-Smoking</p>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
                </div>
                <p className='pl-5 mb-4 text-gray-500'>Summary of charges</p>

                <div className='pl-5 grid grid-cols-2 gap-4'>
                    <p>Sun, Dec 11</p>
                    <p>250 USD</p>
                    <p>Mon, Dec 12</p>
                    <p>250 USD</p>
                    <p>Tue, Dec 13</p>
                    <p>250 USD</p>
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
                    <p>810 USD</p>
                </div>

                <div className='flex-col justify-start pl-5 w-[90%]'>
                    <h3 className='text-gray-500 mt-4 mb-1'>Additional charges</h3>
                    <p>
                        Complimentary on-site parking
                    </p>
                    <p>
                        Changes in taxes and fees will aff affect the total room price
                    </p>
                </div>

                <div className='flex justify-center'>
                    <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
                </div>

                <h3 className='pl-5'>Payment information</h3>
                <div className='flex pl-5 mt-6'>
                    <img className='w-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1280px-Mastercard_2019_logo.svg.png" alt="mastercard" />
                    <p className='pl-4 font-bold' >****</p>
                    <p className='pl-4 font-bold'>8294</p>
                </div >

                <div className='pl-5 mt-8'>
                    <h3 className='font-semibold text-gray-500'>Modifying</h3>
                    <p>Any change in the length or dates of a reservation</p>
                    <p>may result in a rate change</p>
                </div>
                <div className='flex justify-center'>
                    <hr className='w-[90%] my-8 h-0.5 border-t-0 bg-gray-500 opacity-20 dark:opacity-50' />
                </div>

                <div className='flex flex-col w-[80%] mb-28 pl-5'>
                    <h3 className='font-bold text-1xl text-gray-500'>
                        Cancellation policy
                    </h3>
                    <p>
                        You may cancel your reservation for no charge, before 3 days' arrival. Please note that we will assess a fee of 810 USD if you must cancel after this deadline.
                    </p>
                </div>
            </div>
            <div className='sticky inset-x-0 bottom-0 flex justify-center z-30 bg-white border-t-[3px] '>
                <button className='mb-5 mt-5 bg-[#3F0071] disabled text-white font-semibold py-4 px-4 rounded-full w-[85%]'>
                    Book now
                </button>
            </div>
        </>
    )
}

export default page