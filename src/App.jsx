/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
/* eslint-disable react/jsx-fragments */

import {jsx} from '@emotion/core';
import {useEffect, useState} from 'react';
import Select from 'react-select';
import {format} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';


const toto = [
    {value: 'Europe/Berlin', label: 'Berlin'},
    {value: 'America/Los_Angeles', label: 'Rome'},
    {value: 'Europe/Paris', label: 'Paris'},
];
const Clock = props => {
    const [date, setDate] = useState(new Date());
    const [test, setTest] = useState(date.toLocaleTimeString());
    const [selectedValue, setSelectedValue] = useState(null);


    const tick = () => {
        setDate(new Date());
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return ( () => clearInterval(timerID));

    });

    const onValueChange = (selectedValue) => {
        setSelectedValue(selectedValue.value)
    }
    useEffect(() => {
        const tesi = zonedTimeToUtc(date, selectedValue)
        setTest(format(tesi, 'H:m:ss'))
    }, [date, selectedValue])

    return (
        <div>
            <h1>Hello, world!</h1>
            <Select value={selectedValue?.label} options={toto} onChange={onValueChange}/>
            <h2>It is {test} </h2>
        </div>
    );
}

export default Clock;