import React, { useEffect } from 'react'
import Testshowk from './Testshowk'

const Showas = ({ hech, assessment, status, setAuth, setMaintopic, hech_id, setScoreCheck, setCreate }) => {

    const now = new Date();
    const start_date = Math.floor(now.getTime() / 1000)
    console.log(assessment , start_date);
    let mode = "ไม่มีเอกสารการประเมิน"
    return (
        <div>
            {assessment.length > 0 ? assessment.map((i) => (
                <div>
                    {start_date > i.am_createdate & start_date < i.am_enddate && <Testshowk hech={hech} ass_year={i.am_year} nameYear={i.am_name} status={status} setAuth={setAuth} time={i.am_number_of_kpi}
                        setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck} mode={mode} setCreate={setCreate} />}
                </div>
            )) :
                <div>
                    ไม่มีการสร้างแบบประเมิน kpi ประจำปี
                </div>}
        </div>
    )
}

export default Showas