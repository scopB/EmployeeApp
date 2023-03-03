import React from 'react'

const Editass = ({ assessment , setCreateDetail , setModeCreate , setAuth }) => {

    // console.log(assessment);

    const onEdit = (res) =>{
        setModeCreate("111")
        setCreateDetail(res)
        localStorage.setItem("auth", "ass_edit")
        setAuth("ass_edit")
    }


    return (
        <div>
            {assessment.length > 0 ?
                <div>
                    {assessment.map((i, index) => (
                        <div>
                            {index + 1} :
                            {i.am_name}
                            <br></br>
                            การประเมินประจำปี {i.am_number_of_year} ครั้งที่ : {i.am_number_of_kpi}
                            <br></br>
                            วันที่เริ่มการประเมิน : {new Date(i.am_createdate*1000).toLocaleString('th-TH')}
                            <br></br>
                            สิ้นสุดการประเมิน : {new Date(i.am_enddate*1000).toLocaleString('th-TH')}
                            <div>
                                <button onClick={()=> onEdit(i)}>แก้ไขการรายละเอียดประเมิน {i.am_name}</button>
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