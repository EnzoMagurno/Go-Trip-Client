'use client'
import React from 'react'
import axios from '../../utils/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'
import { fetchingServices } from '@/redux/Features/Services/servicesSlice';
import { MainGlobal } from '@/redux/mainInterface';

interface ServicesProps {
	window: string;
	closeWindow: never;
}

const ServicesOptions: React.FC<ServicesProps> = ({ window, closeWindow }) => {

    const dispatch = useDispatch()

const [serviceName, setServiceName] = useState([]);

const services = useSelector((state: MainGlobal) => state.services.dataService)
console.log(services);
  
  

  useEffect(() => {
    
    
      dispatch(fetchingServices())
  },[])
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    
    
//     const updatedServiceName = serviceName.filter((c) => c[0] !== e.target.value);
//     setServiceName(updatedServiceName);
//     setForm({
//       ...form,
//       ServicesRoom: form.ServicesRoom.filter((c) => c !== e.target.value)
//   })
   }
   


	return (
		<div
			className={`absolute  ${window} top-12 z-50 bg-white w-1/2 pt-5 pb-5 rounded-3xl shadow-img flex flex-col justify-between`}
		>
			<button
				onClick={closeWindow}
				className='absolute top-4 right-4 w-6 h-6 flex justify-center items-center '
			>
				
			</button>
			<ul>
				{services && services?.map(service =>  (
                    <li key={service.id}>
                        <label>{service.name}
                        <input type="checkbox"  />
                        </label>
                    </li>
                ))}
			</ul>
		</div>
	);
};

export default ServicesOptions;