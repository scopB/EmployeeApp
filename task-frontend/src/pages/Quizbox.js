import React, { useState } from 'react'

const Quizbox = ({name , text , setQuizz , setAuth}) => {

    const onChange = () =>{
        setAuth("doing")
        setQuizz(text)
    }

  return (
    <div >
        <button className='btn3 btn-block2' onClick={onChange}>{name}</button>
    </div>
  )
}

export default Quizbox