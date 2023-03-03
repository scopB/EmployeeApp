import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './showsty.css'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';
import Showscorer from './Showscorer';

const Searchbox = ({ setData }) => {

    function add(arr, year) {
        const found = arr.some(el => el.value === year);
        if (!found) arr.push({ value: year, label: year });
    }

    useEffect(() => {
        axios.get(`${linkUrl.LinkToBackend}/show_assessment`).then((res_year) => {
            // console.log(res_year);
            res_year.data.map((i) => {
                add(options_year, i.am_number_of_year)
            })
        })//i.am_number_of_year
        axios.get(`${linkUrl.LinkToBackend}/get_all_user`).then((res_user) => {
            res_user.data.map((i) => {
                const user = localStorage.getItem("user_code")
                if (i.ps_id !== Number(user)) {
                    let temp = { value: i.ps_id, label: i.ps_name }
                    options_user.push(temp)
                }
            })
        })//i.ps_id and i.ps_name
        axios.get(`${linkUrl.LinkToBackend}/get_all_ore`).then((res_ore) => {
            res_ore.data.map((i) => {
                let temp = { value: i.ore_id, label: i.ore_shortname }
                options_ore.push(temp)
            })
        })//i.ore_id and i.ore_shortname 
    })


    const [year, setYear] = useState('')
    const [user, setUser] = useState('')
    const [ore, setOre] = useState('')
    const [name, setName] = useState('Search by User')
    const [mode, setMode] = useState(false)
    const [body, setBody] = useState([])

    var options_year = []
    var options_user = []
    var options_ore = []

    const get_data = (input1, input2) => {
        // console.log(input1,input2);
        axios.post(`${linkUrl.LinkToBackend}/search_score`, input1).then((res) => {
            var temp_res = res.data
            // console.log(res.data);
            axios.post(`${linkUrl.LinkToBackend}/search_score`, input2).then((res1) => {
                temp_res = [...temp_res, ...res1.data]
                // console.log(temp_res);
                let list = []
                temp_res.map((i) => {
                    // console.log(i);
                    if (i.doc_id !== "") {
                        list.push(i)
                    }
                })
                setList(list)
            })
        })
    }

    async function setList(list) {
        // console.log(list);
        let result_list = []
        for (var i in list) {
            var color = ""
            if (list[i].doc_score >= 80) {
                color = 'green'
            }
            else if (list[i].doc_score >= 70 && list[i].doc_score < 80) {
                color = 'lightgreen'
            }
            else if (list[i].doc_score >= 60 && list[i].doc_score < 70) {
                color = 'yellow'
            }
            else if (list[i].doc_score >= 50 && list[i].doc_score < 60) {
                color = 'orange'
            }
            else {
                color = 'red'
            }
            let res = await axios.get(`${linkUrl.LinkToBackend}/find_user/${list[i].doc_foruserid}`)
            let temp = { ps: res.data, body: list[i], color: color }
            // console.log(temp);
            result_list.push(temp)
        }
        console.log(result_list);
        setBody(result_list)
    }

    const handleSearch = () => {
        // console.log("lo");

        if (year === '') {
            alert('Input year')
            // window.location.reload(false);
        }
        else if (ore === '') {
            let temp1 = { year: year.value + "-1", mode: 1, search_input: user.value }
            let temp2 = { year: year.value + "-2", mode: 1, search_input: user.value }
            // console.log(temp);
            get_data(temp1, temp2)
        }
        else if (user === '') {
            let temp1 = { year: year.value + "-1", mode: 0, search_input: ore.value }
            let temp2 = { year: year.value + "-2", mode: 0, search_input: ore.value }
            // console.log(temp);
            get_data(temp1, temp2)
        }
    }
    const handleMode = () => {
        setMode(!mode)
        // console.log(mode);
        if (mode === true) {
            setName("Search by User")
            setOre('')
        }
        else {
            setName("Search by Ore")
            setUser('')
        }
    }


    return (
        <div >
            {/* <input className='w-1-box' type="text" placeholder='kpi year' /> */}
            <button onClick={handleMode}>{name}</button>
            <div>
                Year :
                <Select
                    defaultValue={year}
                    onChange={setYear}
                    options={options_year}
                />

                {mode === false &&
                    <div>
                        User :
                        <Select
                            defaultValue={user}
                            onChange={setUser}
                            options={options_user} />
                    </div>}
                {mode === true &&
                    <div>
                        Ore :
                        <Select
                            defaultValue={ore}
                            onChange={setOre}
                            options={options_ore} />
                    </div>}
            </div>
            <button className='w-2-buttom' onClick={handleSearch}>Search KPI</button>
            <fieldset>
                <legend>Filter</legend>
                <div>
                    <input type="radio" name="1" />
                    <label for="1">only first time kpi</label>
                    <input type="radio" name="1" />
                    <label for="1">only Second time kpi</label>
                    <input type="radio" name="1" />
                    <label for="1">Summary</label>
                </div>
            </fieldset>
            {body.map((e)=>(
                <Showscorer data_body={e} />
            ))}
        </div>
    )
}

export default Searchbox