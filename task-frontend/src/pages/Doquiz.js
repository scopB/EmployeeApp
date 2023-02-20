import axios from 'axios'
import React, { useState } from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';
import { useEffect } from 'react';

const Doquiz = ({name,quiz}) => {
  const [score , setScore] = useState([])
  const [tempscore , settempScore] = useState([])
  var all_weight = 0
  
  useEffect(()=>{
    quiz.map((res)=>{
      all_weight = all_weight + res.mt_weight
      let temp = {nametop : res.mt_name , score : 0 , weighttop : res.mt_weight}
      tempscore.push(temp)
    })
    console.log("mt :",all_weight)
  },[])

  const onChick = () =>{
    console.log(tempscore);
  }

  return (
    <div>
      {quiz.map((res)=>(
            <Child text={res} setscore={tempscore}/>
        ))}
      <button className='btn btn-block' onClick={onChick}>Submit</button>
    </div>
  )
}

export default Doquiz