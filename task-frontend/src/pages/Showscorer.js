import React, { useState } from 'react'
import Scoreinfo from './Scoreinfo';
import './showsty.css'
const Showscorer = ({ data_body }) => {
    // console.log(data_body);
    const [mode, setMode] = useState(false)
    var x = ""
    if (data_body.mode === 0) {
        return (
            <div>
                <div className='conner'>
                    <h2>ชื่อผู้ได้รับการประเมิน : {data_body.ps.ps_name} {data_body.ps.ps_lastname}</h2>
                    <h6>การประเมินประจำปี : {data_body.body.doc_year}</h6>
                    <div className='scorebox'>
                        <div className={'littlebox ' + data_body.color}>
                            คะแนนการประเมินประจำปี {data_body.body.doc_year} : {data_body.body.doc_score}
                            <div>
                            <button onClick={() => { setMode(!mode) }}>รายละเอียดเอกสาร</button>
                            </div>
                            {mode === true && <Scoreinfo quiz={data_body.body} score={data_body.score} />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className='conner'>
                    <h2>ชื่อผู้ได้รับการประเมิน : {data_body.ps.ps_name} {data_body.ps.ps_lastname}</h2>
                    <h6>การประเมินประจำปี  : {data_body.body.doc_year}</h6>
                    <div className='scorebox'>
                        <div className={'littlebox ' + data_body.color}>
                            คะแนนการประเมินประจำปี {data_body.body.doc_year} : {data_body.body.doc_score_sum}
                            <br></br>
                            ครั้งที่-1 : {data_body.body.doc_score}
                            <br></br>
                            ครั้งที่-2 : {data_body.body.doc_score2}
                            <div>
                            <button onClick={() => { setMode(!mode) }}>รายละเอียดเอกสาร</button>
                            </div>
                            {mode === true && <Scoreinfo quiz={data_body.body} mode = {data_body.mode} score1={data_body.score1} score2={data_body.score2}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Showscorer

// <div className={'littlebox ' + x}>
//                                     {a.number_quiz} : {a.score}
//                                 </div>