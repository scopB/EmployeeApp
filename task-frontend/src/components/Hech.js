import axios from 'axios'
import React, { useState } from 'react'
import Showas from './Showas'
import { linkUrl } from '../urlBackend';

const Hech = ({hech , assessment , hech_id , setAuth , setMaintopic , setScoreCheck , setCreate}) => {

    const [showAssessment , setShowassessment] = useState(false)
    const [status , setStatus] = useState()



    const onHandle = async() =>{
        let tempyear = []
        assessment.map((i)=>{
          tempyear.push(i.am_year)
        })
        let temp = {id : hech_id , year : tempyear}
        let result
        await axios.post(`${linkUrl.LinkToBackend}/get_doc_from`, temp).then((res)=>{
          result = res.data
        })
        // console.log(result);
        setStatus(result)
        setShowassessment(!showAssessment)
        // console.log(status);
        // console.log(temp)
    }
  return (
    <div className=''>
        <button className='btn' onClick={onHandle}>{hech}</button>
        {showAssessment && <Showas hech={hech} assessment={assessment} status={status} setAuth={setAuth} 
        setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck} setCreate={setCreate}/>}
    </div>
  )
}

export default Hech