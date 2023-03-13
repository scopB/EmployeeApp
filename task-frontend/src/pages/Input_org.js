import React, { ChangeEvent, useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';
import axios from 'axios';
import Comfirmwindow from '../components/Comfirmwindow';
import Select from 'react-select';

const Input_org = () => {
    const [jsonData, setJsonData] = useState(null)
    const [dataread, setDataread] = useState()
    const [showBox, setShowBox] = useState(false)
    const [orgNow, setOrgNow] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [ore_data, setOre_data] = useState([])
    const [options, setOptions] = useState([])
    const data_ore = []

    useEffect(() => {
        console.log(options.length)
        if (options.length === 0) {
            get_org_data()
        }
    })

    function get_org_data() {
        axios.get(`${linkUrl.LinkToBackend}/get_all_ore`).then((res) => {
            // console.log(res.data)
            let list_data = res.data
            setOre_data(list_data)
            let temp_list = []
            ore_data.map((i) => {
                let temp = { value: i.ore_id, label: i.ore_shortname }
                temp_list.push(temp)
                data_ore.push(i)
            })
            setOptions(temp_list)
        })
    }

    function previewFile() {
        const content = document.querySelector('.content');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setDataread(reader.result)
            let tempdata = reader.result
            convertString(tempdata)
        }, false);
        if (file) {
            reader.readAsText(file);
        }
    }

    function convertString(string) {
        let rows_raw = string.split('\n')
        // console.log(rows_raw);
        let rows = []
        for (let i = 0; i < rows_raw.length; i++) {
            if (rows_raw[i] !== "") {

                rows.push(rows_raw[i].replace(/(?:\r\n|\r|\n|\t)/g, ''))
            }
        }
        // console.log(rows);
        let headers = rows[0].split(',')
        for (let i = 0; i < headers.length; i++) {
            headers[i] = headers[i].replace(/(?:\r\n|\r|\n|\t)/g, '');
        }
        let data = []
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                if (headers[j] === "ore_id" || headers[j] === "ore_supervisor" || headers[j] === "create_date" || headers[j] === "ore_createby") {
                    row[j] = Number(row[j])
                }
                obj[headers[j]] = row[j];
            }
            if (Object.keys(obj).length !== 0) {
                data.push(obj);
            }
        }
        setJsonData(data)
        setShowBox(true)
    }

    const check_data = () => {
        console.log(jsonData)
        for (let i = 0; i < jsonData.length; i++) {
            let data_input = jsonData[i]
            axios.post(`${linkUrl.LinkToBackend}/insert_ore`, data_input).then((res) => {
                window.location.reload(false);
                // if (res.data === true) {
                //     alert("INSERT SUCCESS")
                // }
                // else {
                //     alert("INSERT FAILL")
                // }

            })
        }
    }

    const ShowEditdata = (e) => {
        e.preventDefault();
        console.log(data_ore)
        setShowForm(true)
    }

    return (
        <div>
           {!showBox && <div className='body-insert'>
                เพิ่มหน่วยงาน :
                <div className='file-body'>
                    <input type="file" name="file_cvs" />
                </div>
                <div className='insert-btn'>
                    <button onClick={previewFile}>Submit</button>
                </div>
            </div>}
            {showBox && <Comfirmwindow message={"Comfirm to insert Ore"} setShowBox={setShowBox} check_data={check_data} />}

            {/* <div>
                <form onSubmit={ShowEditdata}>
                <Select
                    defaultValue={orgNow}
                    onChange={setOrgNow}
                    options={options}
                />
                <button>Serch</button>
                </form>
            </div> */}
        </div>
    )
}

export default Input_org