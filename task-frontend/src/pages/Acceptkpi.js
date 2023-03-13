import axios from 'axios';
import React, { useState } from 'react'
import { linkUrl } from '../urlBackend';

const Acceptkpi = ({ all, doc_id, name, quiz }) => {

    const [text, setText] = useState('')
    const now = new Date();

    const handleStatus = () => {
        let time = Math.floor(now.getTime() / 1000)
        let temp = { doc_id: doc_id, year: name, status_update: "22", last_see: time };
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
            console.log(res);
            window.location.reload(false);
        })
    }

    const handleStatusCancel = () => {
        const now = new Date();
        let time = Math.floor(now.getTime() / 1000)
        let temp = {
            doc_year: all.doc_year, doc_id: all.doc_id, doc_yeartime: all.doc_yeartime,
            doc_createbyid: all.doc_createbyid, doc_foruserid: all.doc_foruserid,
            doc_createdate: time, doc_denyDetail: text, doc_maintopic: quiz, doc_name: all.doc_name
        }
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_deny_doc`, temp).then((res) => {
            console.log(res);
            window.location.reload(false);
        })
    }



    return (
        <div className='body-accept'>
            <div className='box-accept-doc'>
                ชื่อเอกสาร : {all.doc_name}
                <br></br>
                การประเมินประจำปี : {name}
            </div>
            <br></br>
            {/* <br></br> */}
            {quiz.map((i, index) => (
                <div className='head-acc'>
                    {index + 1}. วัตถุประสงค์ : {i.mt_name}
                    <div className='acc-w-s'>
                        <h5> น้ำหนัก : {i.mt_weight}</h5>
                    </div>
                    <div>
                        {i.mt_suptopic.map((j, indexj) => (
                            <div className='testbocy-accp'>
                                {index + 1}.{indexj + 1}. ตัวชี้วัดหลัก : {j.st_name} <div className='acc-w-s-2'><h5>น้ำหนัก : {j.st_weight}</h5></div>
                                <div>
                                    {j.st_supdetail.map((k, indexk) => (
                                        <div className='testbocy-accp'>
                                            {index + 1}.{indexj + 1}.{indexk + 1}. ตัวชี้วัดรอง : {k.sd_name} <div className='acc-w-s-3'><h5>น้ำหนัก : {k.weight}</h5>
                                                <br></br>
                                                เกณฑ์วัดผล :
                                                <br></br>
                                                1. {k.sd_choice01}
                                                <br></br>
                                                2. {k.sd_choice02}
                                                <br></br>
                                                3. {k.sd_choice03}
                                                <br></br>
                                                4. {k.sd_choice04}
                                                <br></br>
                                                5. {k.sd_choice05}
                                                <br></br>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <label>กรุณาระบุเหตุผล</label>
            <input type="text" onChange={(e) => { setText(e.target.value) }} ></input>

            <button onClick={handleStatus}>ยอมรับเอกสารการประเมิน</button>
            <button onClick={handleStatusCancel}>ปฏิเสธเอกสารการประเมิน</button>
        </div>
    )
}

export default Acceptkpi