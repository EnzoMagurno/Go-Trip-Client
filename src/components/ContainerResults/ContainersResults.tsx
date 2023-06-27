"use client"
import { useSelector } from "react-redux";
import { selectHotelState } from "../../redux/Features/Hotel/hotelsSlice"
import ContainerResult from "./ContainerResult";

const ContainerResults = ({roboto}) => {
    const hotels = useSelector(selectHotelState) 

    console.log(hotels)


    return (
        <div className="grid grid-rows-6 gap-5" >
            {
                hotels.map(hotel => <ContainerResult 
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name} 
                    img={hotel.image} 
                    cost={hotel.rates_from}
                    reviews={hotel.number_of_reviews}
                    rating={hotel.rating_average}
                    city={hotel.destination.city}
                    state={hotel.destination.state}
                    country={hotel.destination.country}
                    roboto={roboto}
                    />)
            }    
          
        </div>
    )
};

export default ContainerResults;