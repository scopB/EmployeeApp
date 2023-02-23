import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { linkUrl } from '../urlBackend';
import axios from 'axios';

const Testcreate = () => {

    const options = []
    const [kpitime, setKpitime] = useState("")
    const [start, onStart] = useState(new Date());
    const [finish, onFinish] = useState(new Date());
    const [year_kpi, onYear_kpi] = useState("")
    const now = new Date();

    useEffect(() => {
        if (options.length === 0) {
            const temp1 = { value: "1", label: "1" }
            const temp2 = { value: "2", label: "2" }
            options.push(temp1)
            options.push(temp2)
        }
    })

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSubmit = (e) => {
        e.preventDefault()
        if (year_kpi === "" || kpitime === ""){
            alert("Input Not full")
        }
        else
        {
            const start_date = Math.floor(start.getTime()/1000)
            const finish_date = Math.floor(finish.getTime()/1000)
            const user = localStorage.getItem("user_code")
            const data_input = { am_year:year_kpi , am_number_of_kpi : kpitime.value , am_createby : user ,
                am_createdate : start_date , am_enddate : finish_date
            };

            console.log(data_input)
            axios.post(`${linkUrl.LinkToBackend}/create_assessment`, data_input).then((res) => {
                if (res.data === true) {
                    alert("Add User 100%")
                }
                else {
                    alert("Error")
                }
                window.location.reload(false);
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                
                Input year of kpi : <input type="text" placeholder='Year of kpi' value={year_kpi} onChange={(e) => onYear_kpi(e.target.value)} />

                Time to start : <DateTimePicker onChange={onStart} value={start} />

                Time to finish : <DateTimePicker onChange={onFinish} value={finish} />

                <Select
                    defaultValue={kpitime}
                    onChange={setKpitime}
                    options={options}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Testcreate