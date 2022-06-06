import React from 'react'
import Child from './Child'

const Doquiz = ({quiz}) => {

  return (
    <div>
      {quiz.map((res)=>(
            <Child text={res}/>
        ))}
      <button className='btn btn-block'>Submit</button>

    </div>
  )
}

export default Doquiz