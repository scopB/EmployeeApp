import React, { useState } from 'react'
import Showas from './Showas'

const Hech = ({hech , assessment}) => {

    const [showAssessment , setShowassessment] = useState(false)

    const onHandle = () =>{
        setShowassessment(!showAssessment)
        // console.log(assessment)
    }
  return (
    <div>
        <button onClick={onHandle}>{hech}</button>
        {showAssessment && <Showas assessment={assessment}/>}
    </div>
  )
}

export default Hech