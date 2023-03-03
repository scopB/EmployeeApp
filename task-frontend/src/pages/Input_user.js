import React, { ChangeEvent, useState } from 'react'
import { linkUrl } from '../urlBackend';
import axios from 'axios';
import Comfirmwindow from '../components/Comfirmwindow';

const Input_user = () => {
    const [jsonData, setJsonData] = useState(null)
    const [dataread, setDataread] = useState()
    const [showBox, setShowBox] = useState(false)

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
        let rows = []
        for (let i = 0; i < rows_raw.length; i++) {
            if (rows_raw[i] !== "") {
                rows.push(rows_raw[i].replace(/(?:\r\n|\r|\n|\t)/g, ''))
            }
        }
        let headers = rows[0].split(',')
        for (let i = 0; i < headers.length; i++) {
            headers[i] = headers[i].replace(/(?:\r\n|\r|\n|\t)/g, '');
        }
        let data = []
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            // console.log(row);
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                if (row[j] === "") {
                    continue
                }
                if (headers[j] === "ps_id" || headers[j] === "ps_org_id" || headers[j] === "st_lastlogin" || headers[j] === "ps_birthday" || headers[j] === "ps_bossid") {
                    row[j] = Number(row[j])
                }
                // console.log("asd");
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
            axios.post(`${linkUrl.LinkToBackend}/insert_user`, data_input).then((res) => {
                window.location.reload(false);
            })
        }
    }
    return (
        <div>
            INSERT USER :
            <input type="file" name="file_cvs" />
            <button onClick={previewFile}>Submit</button>
            {showBox && <Comfirmwindow message={"Comfirm to insert User"} setShowBox={setShowBox} check_data={check_data}/>}
        </div>
    )
}

export default Input_user