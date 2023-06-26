'use client';
import { useEffect } from "react";
import ContainerTypesRooms from "../../../components/ContainerTypesRooms/ContainerTypesRooms";
import SettingsHotel from "../../../components/SettingsHotel/SettingsHotel";
import { useDispatch, useSelector } from "react-redux";
import { selectHotelIdState, fetchinHotelId } from "../../../redux/Features/Hotel/hotelsSlice";
const DetailHotel = ({ params }) => {

	const { idHotel } = params

    const dispatch = useDispatch()
    const hotel = useSelector(selectHotelIdState)
    useEffect(() => {
		dispatch(fetchinHotelId(idHotel))

    }, [])

	return (
		<div className='p-5 pb-24'>
			<div>
				<SettingsHotel hotel={hotel} />
                <ContainerTypesRooms />
			</div>
		</div>
	);
};

export default DetailHotel;
