import axios from 'axios'
import React, { useState } from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';
import { useEffect } from 'react';

const Doquiz = ({name,quiz}) => {
  const [score , setScore] = useState()
  var all_weight = 0
  
  useEffect(()=>{
    quiz.map((res)=>{
      all_weight = all_weight + res.mt_weight
    })
    console.log("mt :",all_weight)
  },[])

  return (
    <div>
      {quiz.map((res)=>(
            <Child text={res} setscore={setScore}/>
        ))}
      <button className='btn btn-block'>Submit</button>
    </div>
  )
}

export default Doquiz