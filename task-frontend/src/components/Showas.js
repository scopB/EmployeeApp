import React, { useEffect } from 'react'
import Testshowk from './Testshowk'

const Showas = ({ assessment , status , setAuth , setMaintopic , hech_id , setScoreCheck}) => {

    // console.log(assessment , status);
    return (
        <div>
            {assessment.length > 0 ? assessment.map((i) => (
                <Testshowk ass_year= {i.am_year} status={status} setAuth={setAuth} 
                setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck}/>
            )) :
                <div>
                    No assessment
                </div>}
        </div>
    )
}

export default Showas