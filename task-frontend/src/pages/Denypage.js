import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';

const Denypage = ({ assessment }) => {

    // console.log(assessment);

    const [search, setSearch] = useState()
    const [denyBody, setDenyBody] = useState([])
    const [show, setShow] = useState("0")

    const options = []

    useEffect(() => {
        assessment.forEach((item) => {
            let temp = { value: item.am_year, label: item.am_name }
            options.push(temp)
        });
    })

    const onSearch = () => {
        // console.log(search.value);
        axios.get(`${linkUrl.LinkToBackend}/show_deny_doc/${search.value}`).then(async(res) => {
            // console.log(res.data);
            let list = res.data
            let temp = []
            for (var i in res.data)
            {
                let res = await axios.get(`${linkUrl.LinkToBackend}/find_user/${list[i].doc_foruserid}`)
                let temp_ = {name : res.data , body : list[i]}
                temp.push(temp_)
            }
            console.log(temp);
            setDenyBody(temp)
            setShow("1")
        })
    }

    return (
        <div>
            Denypage
            <Select
                defaultValue={search}
                onChange={setSearch}
                options={options}
            />
            <button onClick={onSearch}>search</button>
            {show !== "0" &&
                <div>
                    {denyBody.length > 0 ?
                        <div>
                            {denyBody.map((i) => (
                                <div>
                                    ชื่อเอกสาร : {i.body.doc_name}
                                    <br></br>
                                    รอบปีการประเมิน : {i.body.doc_year}
                                    <br></br>
                                    ถูกปฏิเสธจาก : {i.name.ps_name + " " +i.name.ps_lastname}
                                    <br></br>
                                    เหตุผลเมื่อปฏิเสธเอกสารการประเมิน : {i.body.doc_denyDetail}
                                    <br></br>
                                    <br></br>
                                </div>
                            ))}
                        </div> :
                        <div>
                            ' ไม่มีการปฏิเสธเอกสาร '
                        </div>}
                </div>}

        </div>
    )
}

export default Denypage