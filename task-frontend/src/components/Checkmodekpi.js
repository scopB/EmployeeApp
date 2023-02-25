import React from 'react'
import Quizbox from '../pages/Quizbox'
import Accpetstatus from './Accpetstatus'

const Checkmodekpi = ({id,name , status ,text , setQuiz_name , setQuizz , setAuth , setDocid , setQuizbody , body}) => {
  // console.log(id);
  return (
    <div>
      {status === "22" ? <Quizbox doc_id={id} name={name} status = {status} text={text} setQuiz_name={setQuiz_name} 
        setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body}/> : 
        status === "00" ? <Accpetstatus doc_id={id} name={name} status = {status} text={text} setQuiz_name={setQuiz_name} 
        setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid}/> : 
        <div>
          WaitStatus
          <button className='btn-quiz' >{name}</button>
        </div>

        }
    </div>
  )
}

export default Checkmodekpi