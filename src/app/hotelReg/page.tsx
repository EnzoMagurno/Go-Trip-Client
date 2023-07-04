'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import axios from '../../utils/axios'
import validation from './validation'
import { AdvancedImage } from '@cloudinary/react';
import { Errors } from './validation'
import { countries } from 'countries-list'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchingCities } from "../../redux/Features/Citys/CitySlice";
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'
import { MainGlobal } from '@/redux/mainInterface';
import { DragAndDrop } from '@/components/Drag & Drop/DragAndDrop';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const asapSemi = Asap({
  weight: ['600'],
  subsets: ['latin'],
})

const josefinRegular = Josefin_Sans({
  weight: ['400'],
  subsets: ['latin'],
});

const listOfCountries = Object.values(countries)

function HotelRegister() {

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLEMAPS_API_KEY
  // })

  

  const selectCities: object[] = []

  const router = useRouter()

  const dispatch = useDispatch()
  const cities = useSelector((state: MainGlobal) => state.city.dataCity)
 
  const [phoneCode, setPhoneCode] = useState<string[]>([]) 
  const [lada, setLada] = useState('')
  const [completePhone, setCompletePhone] = useState('')
  const [city, setCity] = useState('')


  cities.map(e => selectCities.push({label:e.city, value: e.id}))
  

  useEffect(() => {
    
    dispatch(fetchingCities())
    const optionsPhone: string[] = listOfCountries.map(country => country.phone)
    const phoneSet: string[] = [...new Set(optionsPhone)].sort((a: string, b: string) => parseInt(a, 10) - parseInt(b, 10));
    setPhoneCode(phoneSet)

  },[])

  


interface FormState {
  destinationId: string;
  name: string;
  image: string;
  email: string;
  address: string;
  numberRooms: number
  phone: string;
  checkIn: string;
  checkOut: string;
  overview: string;
 
}

const [errors, setErrors] = useState<Errors>({})

const [form, setForm] = useState<FormState>({
  destinationId: '',
  name: '',
  image: '',
  email: '',
  address: '',
  numberRooms: 0,
  phone: '',
  checkIn: '',
  checkOut: '',
  overview: ''
});

const handleSubmit = async (e: any) => {
  e.preventDefault();
  const formPost = { ...form };
  formPost.numberRooms = Number(form.numberRooms);
  
  
  console.log(formPost);
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_FETCH
    const response = await axios.post("/hotel/newhotel", formPost, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const id = response.data.detail.id;
    console.log(id);
    /*setHotelId(id)  */
    router.push(`/createRoom/?id=${id}`);
  } catch (error) {
    console.error('Error al crear el hotel:', error);
  }
};

const selectChange = (e: any) => {

  if (form.destinationId.includes(e.value)) {}else{
  setForm({
      ...form,
      destinationId: e.value
  });
  setCity(e.label)
  setErrors(validation({
    ...form,
    destinationId: e.value
}))}}
 


const handleChange = (e: any) => {




  setForm({
      ...form,
      [e.target.name]: e.target.value,
      phone: lada+completePhone
      
      
  });
  console.log(e.target.value);
  
  setErrors(validation({
    ...form,
    [e.target.name]: e.target.value
}))
}

const handlePhoneChange = (e: any) => {
  setCompletePhone(e.target.value)
  
  console.log(e.target.value);
}

const selectLadaChange = (e: any) => {
  setLada(e.target.value)
  console.log(lada)
}

// const handleFile = (e: any) => {

// }

console.log(form.image);



  return (
    
    <div className=' mt-20 inset-0 bg-neutral-100 pb-20'>
      
      
   
      <div className={`${asapSemi.className} text-xl w-screen flex justify-start pl-3.5 pt-8`}>
          <h1>List your hotel whith us</h1>
      </div>
      <form  onSubmit={handleSubmit} className='bg-neutral-50  mt-5 flex flex-col p-4 shadow-md'>
        
          <label className={`${josefinRegular.className}`} htmlFor="">City</label>
                    <Select className={`${josefinRegular.className}  text-black w-full mt-2.5 `}
                        name='city'
                        options={selectCities}
                        onChange={selectChange}
                        value={form.destinationId}
                        id="cityInput"
                        placeholder={city}
                        />
                    <span className='text-red-400'>{errors.destinationId && <p>{errors.destinationId}</p>}</span>

          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelNameInput">Hotel name</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type="text"
                        onChange={handleChange}
                        id='hotelNameInput'
                        name='name'
                        value={form.name}
                        autoComplete='off' /> 
                    <span className='text-red-400'>{errors.name && <p>{errors.name}</p>}</span>    

          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelAddressInput">Address</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type="text"
                        onChange={handleChange}
                        id='hotelAddressInput'
                        name='address'
                        value={form.address}
                        autoComplete='off' />     
                    <span className='text-red-400'>{errors.address && <p>{errors.address}</p>}</span>
                    
                    {/* {isLoaded && isLoaded
                    ? <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerStyle={{height: "300px", width:"330px"}}></GoogleMap> 
                    : <div>Loading...</div>}
                     */}
         
          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelToomsInput">Rooms</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type="number"
                        onChange={handleChange}
                        id='hotelRoomsInput'
                        name='numberRooms'
                        value={form.numberRooms}
                        autoComplete='off' />    
                    <span className='text-red-400'>{errors.address && <p>{errors.numberRooms}</p>}</span>

          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelEmailInput">Business email</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type="text"
                        onChange={handleChange}
                        id='hotelEmailInput'
                        name='email'
                        value={form.email}
                        autoComplete='off' />  
                    <span className='text-red-400'>{errors.email && <p>{errors.email}</p>}</span>

          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelPhoneInput">Business phone number</label>
                    <div>
                        <select onChange={selectLadaChange} className={`${josefinRegular.className} border-2 bg-slate-50 rounded-xl mr-2 my-2 pl-3 py-3 pb-3 w-1/3`} id='select'>
                            {phoneCode.map(phone => (
                                <option key={phone} value={phone}>+{phone}</option>
                            ))}
                        </select>

                        <input className={`${josefinRegular.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 w-52`}
                            type="text"
                            onChange={handlePhoneChange}
                            id='hotelPhoneInput'
                            name='phone'
                            value={completePhone}
                            autoComplete='off' />
                    </div>
                    <span className='text-red-400'>{errors.phone && <p>{errors.phone}</p>}</span>

          <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelPhotoInput">Cover photo</label>
                    <DragAndDrop setForm={setForm}/>
                    <span className='text-red-400'>{errors.image && <p>{errors.image}</p>}</span>

        <div className='flex gap-5 '>
        <div className='flex flex-col flex-1 '>
          <label className={`${josefinRegular.className} mt-2.5`} htmlFor='checkIn'>Check in</label>
                    
                        <input className={`${josefinRegular.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3`}
                            type="time"
                            onChange={handleChange}
                            id='checkIn'
                            name='checkIn'
                            value={form.checkIn}
                            autoComplete='off' />
                            <span className='text-red-400'>{errors.checkIn && <p>{errors.checkIn}</p>}</span>
                    </div>
        <div className='flex flex-col flex-1'>
          <label className={`${josefinRegular.className} mt-2.5`} htmlFor='checkOut'>Check out</label>
                    
                        <input className={`${josefinRegular.className} border-2 rounded-xl my-2 pl-3 py-3 pb-3 `}
                            type="time"
                            onChange={handleChange}
                            id='checkOut'
                            name='checkOut'
                            value={form.checkOut}
                            autoComplete='off' />
                        <span className='text-red-400'>{errors.checkOut && <p>{errors.checkOut}</p>}</span>
                    </div>          
        </div>

        <label className={`${josefinRegular.className} mt-2.5`} htmlFor="hotelOverviwew">Tell us more about your hotel</label>
                    <input className={`${josefinRegular.className} border-2 rounded-xl my-2 h-14 pl-4`}
                        type='text'
                        onChange={handleChange}
                        id='hotelOverviwew'
                        name='overview'
                        value={form.overview}
                        autoComplete='off' />  
                    <span className='text-red-400'>{errors.overview && <p>{errors.overview}</p>}</span>

                 {(!form.name || !form.destinationId || !form.email || !form.address || !form.phone || !form.checkIn || !form.checkOut || !form.overview || errors.name || errors.destinationId || errors.email || errors.address || errors.phone || errors.checkIn || errors.checkOut || errors.overview )               
                   ? <button  className={`${josefinRegular.className} bg-[#929292] text-white mt-10 h-10 mx-auto rounded-full w-3/4`} disabled >Create hotel</button>
                   :  <button type="submit" className={`${josefinRegular.className} bg-[#7533ac] text-white mt-10 h-10 mx-auto rounded-full w-3/4`}>Create hotel</button>
                 }
             </form>
      
    </div>
  )
};



export default HotelRegister