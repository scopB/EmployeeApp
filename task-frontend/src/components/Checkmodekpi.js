import React from 'react'
import Quizbox from '../pages/Quizbox'
import Accpetstatus from './Accpetstatus'

const Checkmodekpi = ({ id, name,nameShow, status, text, setQuiz_name, setQuizz, setAuth, setDocid, setQuizbody, body }) => {
  // console.log(id);
  return (
    <div>
      {
      status === "22" ? <Quizbox nameShow={nameShow} doc_id={id} name={name} status={status} text={text} setQuiz_name={setQuiz_name}
        setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body} /> :
        status === "00" ? <Accpetstatus nameShow={nameShow} doc_id={id} name={name} status={status} text={text} setQuiz_name={setQuiz_name}
          setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body}/> :
          status === "11" ?
            <div>
              รอการแก้ไขเอกสารการประเมิน : 
              <button className='btn-quiz' >{nameShow}</button>
            </div> :
            status === "33" &&
            <div>
              ส่งเอกสารการประเมินเรียบร้อย :
              <button className='btn-quiz' >{nameShow}</button>
            </div>
      }
    </div>
  )
}

export default Checkmodekpi