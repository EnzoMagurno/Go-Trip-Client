'use client';
import { DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { saveDates } from "../../redux/Features/Dates/DatesSlice";
//TODO: Me Falta traer los datos y hacer el filtro de la fecha

interface DatesStrings {
    arrival: string
    exit: string
}

interface PropsDatePick {
	open: string
	setInputIsDisabled: any
}

const DatePick: React.FC<PropsDatePick> = ({ open, setInputIsDisabled, toggleOpen }) => {

	const phoneScreen = 650;

	const dispatch = useDispatch()



	const { RangePicker } = DatePicker;

	const [dates, setDates] = useState<string[]>([]);
    const [datesStrings, setDatesString ] = useState<DatesStrings>({
        arrival: "",
        exit: ""
    })
	const [ screenWidth, setScreenWidth ] = useState(0)


	useEffect(() => {
		


		const handleResize = () => {
			setScreenWidth(window.innerWidth)
		}



		window.addEventListener("resize", handleResize)


		handleResize()
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])
    


    const disabledDate = (current: Dayjs | undefined) => {
		if (!current) {
			return false;
		}
		const currentDatePlusOne = dayjs().add(1, 'day').startOf('day');
        const threeMonthsFromNow = dayjs().add(5, 'month').startOf('day');
		return current.isBefore(currentDatePlusOne) || current.isAfter(threeMonthsFromNow)
	};

    const disabledDateExit = (current: Dayjs | undefined) => {
       
        if (!current) {
			return false;
		}

        const selectedDate = dayjs(datesStrings.arrival, 'DD-MM-YYYY');
        const updatedDate = selectedDate.add(1, 'day');
        const updatedDateString = updatedDate.format('DD-MM-YYYY');
        const desiredMinimumDate = dayjs(updatedDateString, 'DD-MM-YYYY').startOf('day');
        const threeMonthsFromNow = dayjs().add(5, 'month').startOf('day');
        return current.isBefore(desiredMinimumDate) || current.isAfter(threeMonthsFromNow);
    
    }

  

	const handleDateChange = (values: any, dateString: string[]) => {
    
        setDates(dateString)
	};

    const handleDateString1 = (values: any, dateString: string ) => {

        console.log({...datesStrings, arrival: dateString})
		 setDatesString({...datesStrings, arrival: dateString})


         
       
	};

    const handleDateString2 = (values: any, dateString: string) => {
        console.log({...datesStrings, exit: dateString});
		setDatesString({...datesStrings, exit: dateString})

		dispatch(saveDates({...datesStrings, exit: dateString}))
        
        toggleOpen()
	
		setInputIsDisabled()
	};

	

    





	if (screenWidth > phoneScreen) {
	
		return (
				<div style={{ margin: 20 }} className={`${open}`}>
				<RangePicker
					format={'DD/MM/YYYY'}
					onChange={handleDateChange}
					disabledDate={disabledDate}
				/>
			</div>
		
			
		);
	} else { 
		return (
			<div className=' font-medium'>
				<h5 className='pb-3  text-zinc-500'>Select a date</h5>
				<div className={`w-full flex justify-between items-center pb-5 `}>
				<DatePicker

					className='border text-iconsPurple w-32 border-iconsPurple shadow-input'
					disabledDate={disabledDate}
					onChange={handleDateString1}
					format={'DD-MM-YYYY'}
					inputReadOnly
                    placeholder='Arrival'
                    
                    
				/>
				<div className='w-3 h-0 border border-zinc-300 inline-block '></div>
				<DatePicker
            
					className='border text-iconsPurple w-32 border-iconsPurple shadow-input'
					onChange={handleDateString2}
					format={'DD-MM-YYYY'}
					inputReadOnly
                    placeholder='Exit'
                    disabledDate={disabledDateExit}


                    

        
				/>
			</div>
			</div>
			
		);
	}
}; 

export default DatePick;
