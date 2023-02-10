import axios from 'axios'
import React, { useState } from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';
import { useEffect } from 'react';

const Doquiz = ({name,quiz}) => {
  const [score , setScore] = useState()
  // const [username,setUsername] = useState()
  // const sendlog = () =>{
  //   const username = localStorage.getItem("username")
  //   const newScore = {username:username,q_NAME:name,result:score}
  //   console.log(newScore)

  //   axios.post(`${linkUrl.LinkToBackend}/submit_quiz`,newScore).then((res)=>{
  //       console.log(res)
  //   })
  //   window.location.reload(false);
  // }
  // const testfun = () =>{
  //   console.log(quiz)
  // }
  var all_weight = 0
  useEffect(()=>{
    quiz.map((res)=>{
      // console.log(res.mt_weight)
      // console.log(all_weight)
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