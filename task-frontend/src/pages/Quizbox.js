import React from 'react'

const Quizbox = ({name , text , setQuiz_name , setQuizz , setAuth}) => {

    const onChange = () =>{
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