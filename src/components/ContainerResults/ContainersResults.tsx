"use client"
import { useDispatch, useSelector } from "react-redux";
import ContainerResult from "./ContainerResult";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHotelsCoincidencesByCityId } from "../../redux/Features/Citys/CitySlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import FiltersBar from "../Filters/FiltersBar";
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from '@reduxjs/toolkit';

	

	
const ContainerResults = () => {
    const searchParams = useSearchParams()
    const idCity = searchParams.get("city")
    const [tokenSession, setTokenSession] = useLocalStorage('token', '');

    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();



    const destination = useSelector((state: any) => state.city.hotelByCity) 
    console.log(destination)


  
    

    
    useEffect(() => {
        console.log(tokenSession)
        dispatch(getHotelsCoincidencesByCityId(idCity))

    }, [idCity])

    

    

    if (destination?.hotel?.length) {
        const { hotel } = destination;

        return (
            <div className="p-5 pb-24">
                <FiltersBar />
                <h3 className="text-center pt-2 pb-2">{ hotel.length } Results of { `${destination.city}, ${destination.state}, ${destination.country}` }</h3>
                 <div className="grid grid-row s-6 gap-5" >
                {
                    hotel.map((hotels: any) => <ContainerResult 
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

export default ContainerResults;