import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';

const All_detail = ({ assessment }) => {

    const [search, setSearch] = useState()
    const [filter, setFilter] = useState()
    const [body, setBody] = useState([])

    const options = []
    const options_filter = []

    useEffect(() => {
        assessment.forEach((item) => {
            let temp = { value: item.am_year, label: item.am_name }
            options.push(temp)
        });
        let all = { value: "-", label: "ทั้งหมด" }
        let no = { value: "999", label: "ไม่มีเอกสารการประเมิน" }
        let noo = { value: "--", label: "ผู้ประเมินยังไม่ส่งเอกสารการประเมิน" }
        let temp_00 = { value: "00", label: "สร้างเอกสารการประเมินแล้ว ยังไม่ได้รับการยื่นยัน" }
        let temp_11 = { value: "11", label: "เอกสารการประเมินถูกปฏิเสธ" }
        let temp_22 = { value: "22", label: "รอการประเมินตนเอง" }
        let temp_33 = { value: "33", label: "เอกสารการประเมินตนเองเสร็จสิ้น" }
        let temp_44 = { value: "44", label: "สิ้นสุดการประเมิน" }
        options_filter.push(all)
        options_filter.push(no)
        options_filter.push(noo)
        options_filter.push(temp_00)
        options_filter.push(temp_11)
        options_filter.push(temp_22)
        options_filter.push(temp_33)
        options_filter.push(temp_44)
    })

    const onSearch = () => {
        axios.get(`${linkUrl.LinkToBackend}/show_ass_user/${search.value}`).then((res) => {
            console.log(res.data);
            if (filter === undefined || filter.value === "-") {
                setBody(res.data)
            }
            else {
                let temp = res.data;
                let setlist = []
                for (var i in temp) {
                    // console.log(i);
                    let check = temp[i].st_statuskpi
                    if(temp[i].st_statuskpi === "55")
                    {
                        check = "22"
                    }
                    else if(temp[i].st_statuskpi === "66"){
                        check = "33"
                    }
                    if (check === filter.value) {
                        setlist.push(temp[i])
                    }
                }
                setBody(setlist)
                // console.log("asd");
            }

        })
    }

    return (
        <div>
            ค้นหาชื่อการประเมิน
            <Select
                defaultValue={search}
                onChange={setSearch}
                options={options}
            />
            กรองตามสถานะ :
            <Select
                defaultValue={filter}
                onChange={setFilter}
                options={options_filter}
            />

            <button onClick={onSearch}>search</button>
            <div >
                {body.length > 0 ?
                    <div className='detail-card'>
                        {body.map((i) => (
                            <div className='box-all-detail'>
                                รหัสประจำตัวพนักงาน : {i.for_user}
                                <br></br>
                                ชื่อ : {i.ps_name} {i.ps_lastname}
                                <br></br>
                                สถานะเอกสาร : {i.st_statuskpi === "999" ? <div>
                                    <h5>
                                        ไม่มีเอกสารการประเมิน
                                    </h5>
                                </div> :
                                i.st_statuskpi === "--" ?
                                <div>
                                    <h5>ผู้ประเมินยังไม่ส่งเอกสารการประเมิน</h5>
                                </div> :
                                    i.st_statuskpi === "00" ?
                                        <div>
                                            <h5>สร้างเอกสารการประเมินแล้ว ยังไม่ได้รับการยื่นยัน</h5>
                                        </div> :
                                        i.st_statuskpi === "11" ?
                                            <div>
                                                <h5>เอกสารการประเมินถูกปฏิเสธ</h5>
                                            </div> :
                                            i.st_statuskpi === "22" | i.st_statuskpi === "55"?
                                                <div>
                                                    <h5>รอการประเมินตนเอง</h5>
                                                </div> :
                                                i.st_statuskpi === "33" | i.st_statuskpi === "66"?
                                                    <div>
                                                        <h5>เอกสารการประเมินตนเองเสร็จสิ้น</h5>
                                                    </div> :
                                                    i.st_statuskpi === "44" &&
                                                    <div>
                                                        <h5>สิ้นสุดการประเมิน</h5>
                                                    </div>

                                }
                                <h5>{i.st_statuskpi != "999" && <div> เมื่อวันที่ : {new Date(i.st_lastsee*1000).toLocaleString('th-TH')}</div>}</h5>
                                <br></br>
                                <div>
                                    ชื่อผู้ประเมิน : {i.boss_name} {i.boss_lastname}
                                    <br></br>
                                    รหัสประจำตัวผู้ประเมิน : {i.boss_id}
                                </div>

                            </div>
                        ))}
                    </div> :
                    <div>
                        ' ค้นหาไม่เจอ '
                    </div>
                }
            </div>
        </div>
    )
}

export default All_detail