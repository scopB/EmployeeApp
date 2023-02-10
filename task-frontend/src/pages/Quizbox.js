import React from 'react'
import { useEffect } from 'react'

const Quizbox = ({name , status ,text , setQuiz_name , setQuizz , setAuth}) => {

    const onChange = () =>{
        console.log(status)
        console.log(text)
        setAuth("doing")
        setQuizz(text)
        setQuiz_name(name)
    }

  return (
    <div >
        <button className='btn-quiz' onClick={onChange}>{name}</button>
    </div>
  )
}

export default Quizbox