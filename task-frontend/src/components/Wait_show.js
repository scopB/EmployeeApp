import React from 'react'
import Testshowk from './Testshowk'

const Wait_show = ({ ass_year, status, setAuth, setMaintopic, hech_id ,setScoreCheck , mode}) => {
  return (
    <div>
        {status.map((i)=>(
            <div>
                {i.doc_year === ass_year && <Testshowk ass_year= {i.am_year} status={i} setAuth={setAuth} 
                setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck} mode ={mode}/>}
                
            </div>
        ))}
    </div>
  )
}

export default Wait_show