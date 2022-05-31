import React from 'react'
import Child from './Child'

const Doquiz = ({quiz}) => {

  return (
    <div>
      {quiz.map((res)=>(
            <Child text={res}/>
        ))}

    </div>
  )
}

export default Doquiz