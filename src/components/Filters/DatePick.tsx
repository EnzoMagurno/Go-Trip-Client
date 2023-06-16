'use client'
import { DatePicker } from 'antd';
import React, { useState } from 'react';


const {RangePicker} = DatePicker

const DatePick= () => {

    const [dates, setDates] = useState([])
    /* console.log(dates) */

    return (
        <div style={{margin:20}}>
            <RangePicker  format={'DD/MM/YYYY'}
            onChange={(values:any)=>{
            // const value1 = (values[0]).format('DD-MM-YYYY')
            // console.log(value1)
            values && setDates(values?.map((item:any)=>{
                return (item).format('DD-MM-YYYY')
            }))
            }}
            />
        </div>
    )
}

export default DatePick