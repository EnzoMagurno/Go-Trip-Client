"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotelState } from '../../redux/Features/Hotel/hotelsSlice';
import ContainerResult from './ContainerResult';
import { useSearchParams } from 'next/navigation';
import { getHotelsCoincidencesByCityId } from '@/redux/Features/Citys/CitySlice';

import FiltersBar from '../Filters/FiltersBar';
import Select from '../Select/Select';

const ContainerResults = () => {
  const searchParams = useSearchParams();
  const idCity = searchParams.get('city');
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.city.hotelByCity);
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para el orden de clasificación

  useEffect(() => {
    dispatch(getHotelsCoincidencesByCityId(idCity));
  }, [idCity]);

  const handleSortOrderChange = (value: any) => {
    setSortOrder(value);
  };

  if (destination?.hotel?.length) {
    const { hotel } = destination;

    // Aplicar el orden al array hotel según el sortOrder seleccionado
    const sortedHotel = hotel.slice().sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  
    

    
    useEffect(() => {
        console.log(tokenSession)
        dispatch(getHotelsCoincidencesByCityId(idCity, tokenSession))

    }, [idCity])

    

    

    if (destination?.hotel?.length) {
        const { hotel } = destination;

        return (
            <div className="p-5 pb-24">
                <FiltersBar />
                <h3 className="text-center pt-2 pb-2">{ hotel.length } Results of { `${destination.city}, ${destination.state}, ${destination.country}` }</h3>
                 <div className="grid grid-row s-6 gap-5" >
                {
                    hotel.map(hotels => <ContainerResult 
                        key={hotels.id}
                        id={hotels.id}
                        name={hotels.name} 
                        img={hotels.image} 
                        city={destination.city}
                        state={destination.state}
                        country={destination.country}
                   
                       
                       
                        
                        />)
                }    
              
            </div>
            </div>
           
        )
    } else {
        return (
            <div className="text-center p-5">
                No se encontraron resultados X
            </div>
        )
    }
   
};
}

export default ContainerResults;