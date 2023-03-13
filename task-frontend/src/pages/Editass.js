import axios from 'axios'
import React from 'react'
import { linkUrl } from '../urlBackend';

const Editass = ({ assessment , setCreateDetail , setModeCreate , setAuth }) => {

    // console.log(assessment);

    const onEdit = (res) =>{
        setModeCreate("111")
        setCreateDetail(res)
        localStorage.setItem("auth", "ass_edit")
        setAuth("ass_edit")
    }

    const onDelete = (item) =>{
        axios.get(`${linkUrl.LinkToBackend}/delete_assessment/${item.am_code}`).then((res)=>{
            if(res.data === true)
            {
                alert("ลบการประเมินสำเร็จ")
            }
            else 
            {
                alert("ลบการประเมินไม่สำเร็จ")
            }
            window.location.reload(false);
        })
    }


    return (
        <div>
            {assessment.length > 0 ?
                <div className='detail-card'>
                    {assessment.map((i, index) => (
                        <div className='box-all-detail'>
                            {/* {index + 1} : */}
                            <h4>{i.am_name}</h4>
                            การประเมินประจำปี {i.am_number_of_year} ครั้งที่ : {i.am_number_of_kpi}
                            <br></br>
                            วันที่เริ่มการประเมิน : {new Date(i.am_createdate*1000).toLocaleString('th-TH')}
                            <br></br>
                            สิ้นสุดการประเมิน : {new Date(i.am_enddate*1000).toLocaleString('th-TH')}
                            <br></br>
                            <div className='btn-test'>
                                <button onClick={()=> onEdit(i)}>แก้ไขการประเมิน</button>
                            </div>
                            <div className='btn-test'> 
                                <button onClick={()=> onDelete(i)}>ลบการประเมิน</button>
                            </div>
                        </div>
                    ))}
                </div> :
                <div>
                    ' ไม่พบการประเมิน '
                </div>
            }
        </div>
    )
}

export default Editass