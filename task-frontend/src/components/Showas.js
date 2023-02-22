import React, { useEffect } from 'react'
import Testshowk from './Testshowk'

const Showas = ({ assessment }) => {

    return (
        <div>
            {assessment.length > 0 ? assessment.map((i) => (
                <Testshowk ass_year= {i.am_year}/>
            )) :
                <div>
                    No assessment
                </div>}
        </div>
    )
}

export default Showas