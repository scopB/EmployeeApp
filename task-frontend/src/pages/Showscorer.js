import React, { useState } from 'react'
import Scoreinfo from './Scoreinfo';
import './showsty.css'
const Showscorer = ({ data_body }) => {
    // console.log(data_body);
    const [mode, setMode] = useState(false)
    var x = ""
    return (
        <div>
            <div className='conner'>
                <h2>Name : {data_body.ps.ps_name} {data_body.ps.ps_lastname}</h2>
                <h6>Quiz Name : {data_body.body.doc_year}</h6>
                <div className='scorebox'>
                    <div className={'littlebox ' + data_body.color}>
                        {data_body.body.doc_year} : {data_body.body.doc_score}
                        <button onClick={() => { setMode(!mode) }}>Check Info</button>
                        {mode === true && <Scoreinfo quiz={data_body.body} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showscorer

// <div className={'littlebox ' + x}>
//                                     {a.number_quiz} : {a.score}
//                                 </div>