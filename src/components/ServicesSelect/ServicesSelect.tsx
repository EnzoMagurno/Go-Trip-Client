'use client'
import React, { useState } from 'react';
import { Asap, Josefin_Sans, Poppins } from 'next/font/google'

const josefinRegular = Josefin_Sans({
    weight: ['400'],
    subsets: ['latin'],
  });

const ServicesSelect = ({ services, selectedServices, setServiceName,onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked, name } = event.target;
    if (selectedServices.includes(value)) {
        
    }else {
    const updatedSelectedServices = checked
      ? [...selectedServices, value]
      : selectedServices.filter((service) => service !== value);
      setServiceName((prevServiceName) => [...prevServiceName, {value, name}])
    onChange(updatedSelectedServices);
    }
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
 
  
  
  return (
    <div className="">
      <div className="" onClick={handleToggleOpen}>
        
          
            <span className="text-sm  text-white bg-[#7533ac] rounded-3xl p-2 px-3">Add existing services</span>
    
      
      </div>
      {isOpen && (
        <div className=" mt-4 grid p-5 z-10 pl-10 bg-white shadow-xl rounded-lg">
          <ul className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <li key={service}>
                <label className=''>
                  <input
                    className=' mr-2'
                    type="checkbox"
                    value={service.id}
                    name={service.name}
                    checked={selectedServices.includes(service.id)}
                    onChange={handleCheckboxChange}
                  />
                  {service.name}
                </label>
              </li>
            ))}
          </ul>
          <button type='button' onClick={handleToggleOpen} className={`${josefinRegular.className} bg-[#7533ac] text-white mt-10 h-10 mx-auto rounded-full w-2/4`}>Done</button>
        </div>
      )}
    </div>
  );
};

export default ServicesSelect;