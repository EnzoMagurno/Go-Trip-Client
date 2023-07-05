import Link from "next/link";
import React from 'react'
import { fetchinCommentByHotel, selectCommentsByHotelId } from '@/redux/Features/Commets/CommentsSlice';
import { useSelector } from "react-redux";
import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import StarRating from "../StarRaiting/StarRaiting";
import { fetchingRooms, fetchRoomById } from "@/redux/Features/Room/RoomSlice";

const ContainerResult = (props) => {
    console.log(props);
    

    const dispatch = useDispatch()

	useEffect(() => {
        dispatch(fetchingRooms(props.id))
        dispatch(fetchinCommentByHotel(props.id)) 
    }, [])

    const rooms = useSelector((state) => state.room.RoomData)
console.log(rooms);


    const comments = useSelector((state) => state.comment.comment);
    console.log(comments);
    
const roomsPrices =  Array.isArray(rooms)
? rooms.filter((room) => room.hotelId === props.id)
: [];


const hotelComments =  Array.isArray(comments)
? comments.filter((comment) => comment.hotelId === props.id)
: [];

console.log(roomsPrices);


console.log(hotelComments);

let basePrice = 250

if (roomsPrices.length) {
     basePrice = roomsPrices[0]?.price;
  } 

const calif = Array.isArray(comments)
    ? comments.filter((comment) => comment.hotelId === props.id)
    : [];

console.log(calif);

const nums = []
calif.map((r) => nums.push(r.rating))




const promedio = (num) => {
    const sum = num.reduce((acc, num) => acc + num, 0);
    const average = sum / num.length;
    const roundedValue = Math.round(average);
    return roundedValue;
  }


const result = promedio(nums)
console.log(result);

    
    return (
        <>
        <Link href={`detail/${props.id}`}>
        
        	<div className='relative h-60'>
			<img src={props.img} alt={props.name} className=' w-full rounded-3xl h-full shadow-img' />
			<div className='absolute bg-gradient-to-t from-black bottom-0 text-white p-4 flex  w-full'>
            
                <div className="w-3/4">
                <h2 className={` tracking-wider`}>{props.name}</h2>
                <h2 className={` tracking-wider`}>{props.city}</h2>
                <StarRating rating={result}/>
                
                <p className=" text-little">{props.state}, {props.country}</p>
                </div>
				<div className="w-1/4 flex flex-col justify-end items-end ">
                <p className="block ">${basePrice}</p>
                <p className=" block text-little">/per night</p>
                </div>
			
            </div>
		</div>
        </Link>
        </>
	
	);
};

export default ContainerResult;
