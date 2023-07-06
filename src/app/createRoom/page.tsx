'use client'
import React from 'react'
import axios from '../../utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import validation from './validation'
import { Errors } from './validation'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchingServices } from '@/redux/Features/Services/servicesSlice';
import { MainGlobal } from '@/redux/mainInterface';
import ServicesOptions from '@/components/ServicesSelect/ServicesSelect';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function RoomCreator() {


const dispatch = useDispatch()

const [tokenSession, setTokenSession] = useLocalStorage('token', '');

const searchParams = useSearchParams()

const id: string | null = searchParams.get('id')

const selectServices: object[] = []
const [serviceName, setServiceName] = useState([]);
const [newService, setNewService] = useState({
  name: ''
})


const router = useRouter()  


  const services = useSelector((state: MainGlobal) => state.services.dataService)
 
  
  services.map(e => selectServices.push({label:e.name, value: [e.id, e.name]}))

  useEffect(() => {
    
    
      dispatch(fetchingServices())
  },[])
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      
       const response = await axios.post("/rooms/newRooms", form, {
        headers: {
          Authorization: `Bearer ${tokenSession}`
        }
      });
  
      console.log(response);
      router.push(`/myHotels/${id}`);
    } catch (error) {
      console.error('Create error:', error);
    }
  };

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

const handleCreate = async (e:any) => {
  if (newService) {
    try {
     
       const response = await axios.post("/service", newService, {
        headers: {
          Authorization: `Bearer ${tokenSession}`
        }
      });
  
      console.log(response.data.name);
       setForm({ ...form, ServicesRoom: [...form. ServicesRoom, response.data.id]})
       setServiceName((prevServiceName) => [
        ...prevServiceName,
        { value: response.data.id, name: response.data.name }
      ])
    } catch (error) {
      console.error('Create service error:', error);
    }
  
  }
}

const handleChangeService = async (e: any) => {
 setNewService({name: e.target.value})
 
}


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



  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    
    
    const updatedServiceName = serviceName.filter((c) => c.value !== e.target.value);
    setForm({
      ...form,
      ServicesRoom: form.ServicesRoom.filter((c) => c !== e.target)
    })
    setServiceName(updatedServiceName);
  
   }
   
   console.log(form);
   

  return (
    
    <div className='relativeflex items-center justify-center  bg-neutral-100 pb-20 inset-0'>
      

      
      
      <form  onSubmit={handleSubmit} className='bg-neutral-50  mt-5 mb-32 flex flex-col p-4 shadow-md'>
          <div className={` text-2xl w-screen flex pt-20`}>
          <h1 className='flex text-center'>Create a room</h1>
      </div>
           <label className={` mt-5`} htmlFor="Type">Name</label>
                    <input className={`  border-2 rounded-xl my-2 pl-3 py-3 pb-3  `}
                        type='text'
                        name='room'
                        id='type'
                        onChange={handleChange}
                        value={form.room}
                        placeholder={form.room}/>
         <span className='text-red-400'>{errors.room && <p>{errors.room}</p>}</span>

          
        <div className='flex gap-5 '>
        <div className='flex flex-col w-5/12 '>
          <label className={` mt-2.5`} htmlFor='price'>Price</label>
                    
                        <input className={` border-2 rounded-xl my-2 pl-3 py-3 pb-3 `}
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
          <label className={` mt-2.5 ` } htmlFor='RoomsNumber'>Rooms</label>
                    
                        <input className={` border-2 rounded-xl my-2 pl-3 py-3 pb-3`}
                            type="number"
                            onChange={handleChange}
                            id='RoomsNumber'
                            name='numRooms'
                            value={form.numRooms}
                            autoComplete='off' />
        <span className='text-red-400'>{errors.numRooms && <p>{errors.numRooms}</p>}</span>

                    </div>  
        </div> 
                    <label className={` mt-2.5`} htmlFor="roomDescription">Description</label>
                    <input className={` border-2 rounded-xl my-2 h-14 pl-4`}
                        type='text'
                        onChange={handleChange}
                        id='roomDescription'
                        name='description'
                        value={form.description}
                        autoComplete='off' />  
        <span className='text-red-400'>{errors.description && <p>{errors.description}</p>}</span>

                     
        <label className={`  my-2.5`} htmlFor="addRoom">Services</label>
        
                    <ServicesOptions
  services={services}
  setServiceName={setServiceName}
  selectedServices={form.ServicesRoom}
  onChange={(updatedSelectedServices: any) =>{ 
    setForm({ ...form, ServicesRoom: updatedSelectedServices})
  }
    
  }
/>
                        <div className='grid bg-neutral-50 grid-cols-3 rounded-xl my-4 gap-4  border-2 justify-between p-2'>
{serviceName && serviceName?.map(c => (<span className={` flex items-center h-full text-center relative  text-md text-white bg-[#7533ac] rounded-xl p-2`}>{c.name}<button type='button' className='w-2 text-lg p-0 absolute -top-0.5 right-0 mr-2'  onClick={handleDelete} value={c.value}>x</button></span>))}
                    </div>
                
                    <label className={` mt-2.5`} htmlFor="NewServices">New service</label>
                    <input className={` border-2 rounded-xl mt-2 h-14 pl-4`}
                        type='text'
                        onChange={handleChangeService}
                        id='NewServices'
                        name='services'
                        value={newService.name}
                        placeholder="Can't fin a specific services? create them!" /> 
                   {newService?<button type='button' onClick={handleCreate} className={` bg-[#7533ac] text-white mt-5 h-10 mx-auto rounded-full w-2/4`}>Create service</button> : <button type='button' disabled className={` bg-gray-500 text-white mt-5 h-10 mx-auto rounded-full w-2/4`}>Create service</button>}

                

                {(!form.room || !form.price || !form.description )               
                   ? <button  className={` bg-[#929292]  text-white mt-10 h-10 mx-auto rounded-full w-3/4`} disabled >Create room</button>
                   :  <button onClick={handleSubmit} type="submit" className={` bg-[#7533ac] text-white mt-10 h-10 mx-auto rounded-full w-3/4`}>Create room</button>
                 }
      </form>
      
    </div>
  )
}

export default RoomCreator