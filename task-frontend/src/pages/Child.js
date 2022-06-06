import React, { useEffect } from 'react'
import Showchild from './Showchild'

const Child = ({text , score}) => {
  
  useEffect(()=>{
    score.push({
      "number_quiz": text.text,
      "score": 0
    })
  },[])
  return (
    <div>
        <div >
            {<Showchild text={text} score={score}/>}
        </div>
    </div>
  )
}

export default Child