import React from 'react'
import Quizbox from '../pages/Quizbox'
import Accpetstatus from './Accpetstatus'

const Checkmodekpi = ({id,name , status ,text , setQuiz_name , setQuizz , setAuth , setDocid}) => {
  // console.log(id);
  return (
    <div>
      {status === "22" ? <Quizbox doc_id={id} name={name} status = {status} text={text} setQuiz_name={setQuiz_name} 
        setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid}/> : 
        <Accpetstatus doc_id={id} name={name} status = {status} text={text} setQuiz_name={setQuiz_name} 
        setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid}/>
        }
    </div>
  )
}

export default Checkmodekpi