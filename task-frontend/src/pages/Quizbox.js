import React, { useState } from 'react'
import Child from './Child'

const Quizbox = ({name , text}) => {

    const [onToggle,setToggle] = useState(false)

    const onChange = () =>{
        setToggle(!onToggle)
    }

  return (
    <div >
        {/* <h2>{name.quiZ_NAME}</h2> */}
        <button className='btn3 btn-block2' onClick={onChange}>{name.quiZ_NAME}</button>
        {text.map((res)=>(
            < Child onToggle={onToggle} text={res}/>
        ))}
        {/* <button onClick={onTest}>test</button> */}
    </div>
  )
}

export default Quizbox