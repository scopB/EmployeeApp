import React, { ChangeEvent, useState } from 'react'
import { linkUrl } from '../urlBackend';
import axios from 'axios';

const Input_org = () => {
    const [jsonData, setJsonData] = useState(null)
    const [dataread, setDataread] = useState()

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
            data.push(obj);
        }
        setJsonData(data)
    }

    const check_data = () => {
        console.log(jsonData)
        for (let i = 0; i < jsonData.length; i++) {
            // console.log(jsonData[i]) 
            let data_input = jsonData[i]
            axios.post(`${linkUrl.LinkToBackend}/insert_ore`, data_input).then((res) => {
                if (res.data === true) {
                    alert("Add User 100%")
                }
            })
        }
    }
    return (
        <div>
            <input type="file" name="file_cvs" />
            <button onClick={previewFile}>Submit</button>
            <button onClick={check_data}>Check</button>
        </div>
    )
}

export default Input_org