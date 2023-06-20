"use client"
import { useSelector } from "react-redux";
import { selectHotelState } from "../../redux/Features/Hotel/hotelsSlice"
import ContainerResult from "./ContainerResult";

const ContainerResults = ({roboto}) => {
    const hotels = useSelector(selectHotelState) 


 
    return (
        <div className="grid grid-rows-6 gap-5" >
            {
                hotels.map(hotel => <ContainerResult 
                    id={hotel.hotel_id}
                    name={hotel.hotel_name} 
                    img={hotel.photo1} 
                    cost={hotel.rates_from}
                    reviews={hotel.number_of_reviews}
                    rating={hotel.rating_average}
                    city={hotel.city}
                    state={hotel.state}
                    country={hotel.country}
                    roboto={roboto}
                    />)
            }    
          
        </div>
    )
};

export default ContainerResults;