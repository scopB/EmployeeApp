import axios from 'axios';
import React, { useState } from 'react'
import { linkUrl } from '../urlBackend';

const Acceptkpi = ({all, doc_id , name, quiz }) => {

    const [text,setText] = useState('')

    const handleStatus = () =>{
        let temp = {doc_id: doc_id,year: name,status_update: "22"}
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`,temp).then((res)=>{
            console.log(res);
            window.location.reload(false);
        })
    }

    const handleStatusCancel = () =>{
        const now = new Date();
        let time = Math.floor(now.getTime()/1000)
        let temp = {doc_year : all.doc_year , doc_id : all.doc_id , doc_yeartime : all.doc_yeartime,
            doc_createbyid : all.doc_createbyid , doc_foruserid : all.doc_foruserid,
            doc_createdate : time , doc_denyDetail : text , doc_maintopic : quiz , doc_name : all.doc_name
        }
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_deny_doc`,temp).then((res)=>{
            console.log(res);
            window.location.reload(false);
        })
    }

    return (
        <div>
            ชื่อเอกสาร : {all.doc_name}
            <br></br>
            การประเมินประจำปี : {name}
            <br></br>
            <br></br>
            {quiz.map((i) => (
                <div>
                    หัวข้อดัชนีชี้วัด : {i.mt_name} น้ำหนัก : {i.mt_weight}
                    <div>
                        {i.mt_suptopic.map((j) => (
                            <div>
                                ดัชนีชี้วัดหลัก : {j.st_name} น้ำหนัก : {j.st_weight}
                                <div>
                                    {j.st_supdetail.map((k) => (
                                        <div>
                                            ดัชนีชี้วัดรอง : {k.sd_name} น้ำหนัก : {k.weight}
                                            <br></br>
                                            ตัวเลือก :
                                            <br></br>
                                            1.{k.sd_choice01}
                                            <br></br>
                                            2.{k.sd_choice02}
                                            <br></br>
                                            3.{k.sd_choice03}
                                            <br></br>
                                            4.{k.sd_choice04}
                                            <br></br>
                                            5.{k.sd_choice05}
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <label>เหตุผลเมื่อปฏิเสธเอกสารการประเมิน</label>
            <input type="text" onChange={(e)=>{setText(e.target.value)}} ></input>

            <button onClick={handleStatus}>ยอมรับเอกสารการประเมิน</button>
            <button onClick={handleStatusCancel}>ปฏิเสธเอกสารการประเมิน</button>
        </div>
    )
}

export default Acceptkpi