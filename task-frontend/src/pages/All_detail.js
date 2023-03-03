import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';

const All_detail = ({ assessment }) => {

    const [search, setSearch] = useState()
    const [body, setBody] = useState([])

    const options = []

    useEffect(() => {
        assessment.forEach((item) => {
            let temp = { value: item.am_year, label: item.am_name }
            options.push(temp)
        });
    })

    const onSearch = () => {
        // console.log(search.value);
        axios.get(`${linkUrl.LinkToBackend}/show_ass_user/${search.value}`).then((res) => {
            console.log(res);
            setBody(res.data)
        })
    }

    return (
        <div>
            All_detail
            <Select
                defaultValue={search}
                onChange={setSearch}
                options={options}
            />
            <button onClick={onSearch}>search</button>
            <div>
                {body.length > 0 &&
                    body.map((i) => (
                        <div>
                            ชื่อ : {i.ps_name} {i.ps_lastname}
                            <br></br>
                            สถานะเอกสาร : {i.st_statuskpi === "999" ? <div>
                                ยังไม่มีเอกสารการประเมิน
                            </div> :
                                i.st_statuskpi === "00" ? <div>สร้างเอกสารการประเมินแล้ว ยังไม่ได้รับการยื่นยัน</div> :
                                    i.st_statuskpi === "11" ? <div>เอกสารการประเมินถูกปฏิเสธ</div> :
                                        i.st_statuskpi === "22" ? <div>รอการประเมินตนเอง</div> :
                                            i.st_statuskpi === "33" ? <div>เอกสารการประเมินตนเองเสร็จสิ้น</div> :
                                                i.st_statuskpi === "44" && <div>สิ้นสุดการประเมิน</div>
                            }
                            <br></br>
                            <br></br>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default All_detail