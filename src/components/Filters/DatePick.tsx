'use client'
import { DatePicker, } from 'antd';
import React, { useState } from 'react';
import dayjs, {Dayjs} from 'dayjs';


TODO: //Me Falta traer los datos y hacer el filtro de la fecha

const DatePick= () => {


    const {RangePicker} = DatePicker

    const [dates, setDates] = useState<string[]>([])
    console.log(dates)

    const handleDateChange = (values: any)=>{

        values && setDates(values?.map((item:Dayjs)=>{
            return (item).format('DD-MM-YYYY')
        }))
        }

    const disabledDate = (current:Dayjs | undefined) => {
        if (!current) {
            return false
        }
        const currentDatePlusOne = dayjs().add(1,"day").startOf('day')
        return current.isBefore(currentDatePlusOne);
    }


      return (
        <div style={{margin:20}}>
            <RangePicker  format={'DD/MM/YYYY'}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            />
        </div>
    )
}

export default DatePick