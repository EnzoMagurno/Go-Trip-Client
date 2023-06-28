'use client'
import React from 'react'
import axios from '../../utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import validation from './validation'
import { Errors } from './validation'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'
import { fetchingServices } from '@/redux/Features/Services/servicesSlice';
import { MainGlobal } from '@/redux/mainInterface';


const asapSemi = Asap({
  weight: ['600'],
  subsets: ['latin'],
})

const josefinRegular = Josefin_Sans({
  weight: ['400'],
  subsets: ['latin'],
});

function RoomCreator() {


const dispatch = useDispatch()



const searchParams = useSearchParams()

const id: string | null = searchParams.get('id')

const selectServices: object[] = []
const [serviceName, setServiceName] = useState([]);

const router = useRouter()  


  const services = useSelector((state: MainGlobal) => state.services.dataService)
  
  services.map(e => selectServices.push({label:e.name, value: [e.id, e.name]}))

  useEffect(() => {
    
    
      dispatch(fetchingServices())
  },[])
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try{
     const response = await axios
      .post("/rooms/newRooms", form)
      .catch((err) => alert(err))
      console.log(response)      
      router.push(`/myHotels/${id}`)
  } catch (error) {
  console.error('Error al crear el hotel:', error);
  }}

interface FormState {
  room: string;
  price: number;
  status: boolean;
  numRooms: number;
  roomsInUse: number;
  description: string
  ServicesRoom: [];
  hotelId: string | null;
  
}

const [errors, setErrors] = useState<Errors>({})

const [form, setForm] = useState<FormState>({
  room: '',
  price: 0,
  status: false,
  numRooms: 0,
  roomsInUse: 0,
  description:'',
  ServicesRoom: [],
  hotelId: id
});


const handleChange = (e: any) => {
  setForm({
      ...form,
      [e.target.name]: e.target.value
      
      
  });
  setErrors(validation({
    ...form,
    [e.target.name]: e.target.value
}))
 
}

const handleSelect = (e: React.MouseEvent<HTMLButtonElement> ) => {
  
  
  if (form.ServicesRoom.includes(e.value[0]))
      {
      
      } else {
  setForm({
      ...form,
      ServicesRoom: [...form.ServicesRoom, e.value[0]]
  })
  setServiceName((prevServiceName) => [...prevServiceName, e.value]);
  
  console.log(form.ServicesRoom);
  


  setErrors(
      validation({
          ...form,
          ServicesRoom: [...form.ServicesRoom, e.value]
      })
  )
  
  }}

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    
    
    const updatedServiceName = serviceName.filter((c) => c[0] !== e.target.value);
    setServiceName(updatedServiceName);
    setForm({
      ...form,
      ServicesRoom: form.ServicesRoom.filter((c) => c !== e.target.value)
  })
   }
   console.log(form.ServicesRoom)

  return (
    
    <div className='relative bg-neutral-100 pb-20 inset-0'>
      

      
      
      <form  onSubmit={handleSubmit} className='bg-neutral-50  mt-5 flex flex-col p-4 shadow-md'>
          <div className={`${asapSemi.className} text-2xl w-screen flex pt-20`}>
          <h1 className='flex text-center'>Create a room</h1>
      </div>
           <label className={`${josefinRegular.className} mt-5`} htmlFor="Type">Name</label>
                    <input className={`${josefinRegular.className}  border-2 rounded-xl my-2 pl-3 py-3 pb-3  `}
                        type='text'
                        name='room'
                        id='type'
                        onChange={handleChange}
                        value={form.room}
                        placeholder={form.room}/>
         <span className='text-red-400'>{errors.room && <p>{errors.room}</p>}</span>

          
        <div className='flex gap-5 '>
        <div className='flex flex-col w-5/12 '>
          <label className={`${josefinRegular.className} mt-2.5`} htmlFor='price'>Price</label>
                    
                        <input className={`${josefinRegular.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 `}
                            type="number"
                            onChange={handleChange}
                            id='price'
                            name='price'
                            value={form.price}
                            autoComplete='off'
                            placeholder='' />
         <span className='text-red-400'>{errors.price && <p>{errors.price}</p>}</span>

                    </div>
        <div className='flex flex-col w-5/12'>
          <label className={`${josefinRegular.className} mt-2.5 ` } htmlFor='RoomsNumber'>Rooms</label>
                    
                        <input className={`${josefinRegular.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3`}
                            type="number"
                            onChange={handleChange}
                            id='RoomsNumber'
                            name='numRooms'
                            value={form.numRooms}
                            autoComplete='off' />
        <span className='text-red-400'>{errors.numRooms && <p>{errors.numRooms}</p>}</span>

                    </div>  
        </div> 
                    <label className={`${josefinRegular.className} mt-2.5`} htmlFor="roomDescription">Description</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type='text'
                        onChange={handleChange}
                        id='roomDescription'
                        name='description'
                        value={form.description}
                        autoComplete='off' />  
        <span className='text-red-400'>{errors.description && <p>{errors.description}</p>}</span>

                     
        <label className={`${josefinRegular.className}  mt-2.5`} htmlFor="addRoom">Services</label>
        <Select className={`${josefinRegular.className}  text-black w-full mt-2.5 `}
                        name='city'
                        options={selectServices}
                        onChange={handleSelect}
                        value={form.ServicesRoom}
                        id="cityInput"
                        placeholder='Services'
                        />
                        <div className='grid bg-neutral-50 grid-cols-3 rounded-xl my-2 gap-4 border border-2 justify-between p-2'>
                    {serviceName.map(c => (<span className={`${josefinRegular.className} flex items-center h-full text-center relative  text-md text-white bg-[#7533ac] rounded-xl p-2`}>{c[1]}<button type='button' className='w-2 text-lg p-0 absolute -top-0.5 right-0 mr-2' onClick={handleDelete} value={c[0]}>x</button></span>))}
                    </div>
                {(!form.room || !form.price || !form.description )               
                   ? <button  className={`${josefinRegular.className} bg-[#929292]  text-white mt-10 h-10 mx-auto rounded-full w-3/4`} disabled >Create room</button>
                   :  <button onClick={handleSubmit} type="submit" className={`${josefinRegular.className} bg-[#7533ac] text-white mt-10 h-10 mx-auto rounded-full w-3/4`}>Create room</button>
                 }
      </form>
      
    </div>
  )
}

export default RoomCreator