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
                let res_ = await axios.get(`${linkUrl.LinkToBackend}/find_user/${list[i].doc_createbyid}`)
                let temp_ = {name : res.data , body : list[i] , boss : res_.data}
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
                        <div className='detail-card' >
                            {denyBody.map((i) => (
                                <div className='box-all-detail'>
                                    <h4>ชื่อเอกสาร : {i.body.doc_name}</h4>
                                    <br></br>
                                    รอบปีการประเมิน : {i.body.doc_year}
                                    <br></br>
                                    เอกสารจากผู้ประเมิน : {i.boss.ps_name + " " +i.boss.ps_lastname}
                                    <br></br>
                                    รหัสประจำตัวผู้ประเมิน : {i.body.doc_createbyid}
                                    <br></br>
                                    <br></br>
                                    ถูกปฏิเสธจาก : {i.name.ps_name + " " +i.name.ps_lastname}
                                    <br></br>
                                    รหัสประจำตัวผู้ปฏิเสธ : {i.body.doc_foruserid}
                                    <br></br>
                                    <h5>เมื่อวันที่ : {new Date(i.body.doc_createdate*1000).toLocaleString('th-TH')}</h5>
                                    <br></br>
                                    เหตุผลเมื่อปฏิเสธเอกสารการประเมิน : {i.body.doc_denyDetail}
                                    
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