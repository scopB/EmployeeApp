import axios from 'axios'
import React from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';

const Doquiz = ({name,quiz}) => {
  const score = []
  // const [username,setUsername] = useState()
  const sendlog = () =>{
    const username = localStorage.getItem("username")
    const newScore = {username:username,q_NAME:name,result:score}
    console.log(newScore)

    axios.post(`${linkUrl.LinkToBackend}/submit_quiz`,newScore).then((res)=>{
        console.log(res)
    })
    window.location.reload(false);
  }
  return (
    <div>
      {quiz.map((res)=>(
            <Child text={res} score={score}/>
        ))}
      <button className='btn btn-block' onClick={sendlog}>Submit</button>

    </div>
  )
}

export default Doquiz