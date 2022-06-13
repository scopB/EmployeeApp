import React from 'react'


function Submit({tasks, onReset , changeState , addquizs}) {

    const fetchdata = () =>{
      addquizs({tasks})
      onReset()
      changeState()
    }
  return (
    <button onClick={fetchdata} className='btn2'>Next</button>
  )
}

export default Submit