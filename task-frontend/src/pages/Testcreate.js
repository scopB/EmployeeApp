import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { linkUrl } from '../urlBackend';
import axios from 'axios';

const Testcreate = ({ modeCreate, CreateDetail ,setAuth}) => {

    // console.log(modeCreate);

    const options = []
    const [kpitime, setKpitime] = useState("")
    const [start, onStart] = useState(new Date());
    const [finish, onFinish] = useState(new Date());
    const [year_kpi, onYear_kpi] = useState("")
    const [nameDoc, setNameDoc] = useState("")
    const now = new Date();

    useEffect(() => {
        // console.log(modeCreate);
        if (options.length === 0) {
            const temp1 = { value: "1", label: "1" }
            const temp2 = { value: "2", label: "2" }
            options.push(temp1)
            options.push(temp2)
        }

    })

    useEffect(() => {
        if (modeCreate !== "0") {
            setNameDoc(CreateDetail.am_name)
            onYear_kpi(CreateDetail.am_number_of_year)
            setKpitime(CreateDetail.am_number_of_kpi)
            onStart(new Date(CreateDetail.am_createdate * 1000))
            onFinish(new Date(CreateDetail.am_enddate * 1000))
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (year_kpi === "" || kpitime === "") {
            alert("Input Not full")
        }
        else {
            const start_date = Math.floor(start.getTime() / 1000)
            const finish_date = Math.floor(finish.getTime() / 1000)
            const user = localStorage.getItem("user_code")
            var data_input = {}
            if (modeCreate === "0") {
                data_input = {
                    am_name: nameDoc, am_number_of_year: year_kpi, am_year: year_kpi + "-" + kpitime.value, am_number_of_kpi: kpitime.value, am_createby: user,
                    am_createdate: start_date, am_enddate: finish_date
                };
                axios.post(`${linkUrl.LinkToBackend}/create_assessment`, data_input).then((res) => {
                    if (res.data === true) {
                        alert("Add Assessment Suscess")  
                    }
                    else {
                        alert("Error")
                    }
                    window.location.reload(false);
                })
            }
            else {
                data_input = {
                    am_code: CreateDetail.am_code,
                    am_name: nameDoc, am_number_of_year: year_kpi, am_year: year_kpi + "-" + kpitime, am_number_of_kpi: kpitime, am_createby: user,
                    am_createdate: start_date, am_enddate: finish_date
                };
                // console.log(data_input);
                axios.post(`${linkUrl.LinkToBackend}/edit_assessment`, data_input).then((res) => {
                    if (res.data === true) {
                        alert("edit Assessment Suscess")
                        window.location.href = '/assessment'
                        localStorage.setItem("auth", "assessment")
                        setAuth("assessment")
                    }
                    else {
                        alert("Error")
                    }
                    window.location.reload(false);
                })
            }
            // console.log(data_input)
        }
    }

    // console.log(kpitime);

    return (
        <div>
            <form onSubmit={onSubmit}>

                กำหนดชื่อเอกสารการประเมิน : <input type="text" placeholder='ชื่อเอกสารการประเมิน' value={nameDoc} onChange={(e) => setNameDoc(e.target.value)} />

                กำหนดปีการประเมิน : <input type="text" placeholder='ระบุปีการประเมิน' value={year_kpi} onChange={(e) => onYear_kpi(e.target.value)} />

                กำหนดระยะเวลาเริ่ม : <DateTimePicker onChange={onStart} value={start} />

                กำหนดระยะเวลาสิ้นสุด : <DateTimePicker onChange={onFinish} value={finish} />

                ครั้งที่ : {modeCreate === "0" ? <Select
                    defaultValue={kpitime}
                    onChange={setKpitime}
                    options={options}
                /> : <input type="number" value={kpitime} onChange={(e) => setKpitime(e.target.value)}></input>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Testcreate