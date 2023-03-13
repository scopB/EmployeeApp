import React, { useEffect, useState } from 'react'
import Quizbox from '../pages/Quizbox'
import Accpetstatus from './Accpetstatus'
import { linkUrl } from '../urlBackend';
import axios from 'axios';


const Checkmodekpi = ({ id, name, nameShow, status, text, setQuiz_name, setQuizz, setAuth, setDocid, setQuizbody, body }) => {
  // console.log(id);
  // console.log(body);
  const [user,setUser] = useState("")
  useEffect(()=>{
    axios.get(`${linkUrl.LinkToBackend}/find_user/${body.doc_createbyid}`).then((res)=>{
        // console.log(res.data);
        setUser(res.data.ps_name+" "+res.data.ps_lastname)
    })
  })


  return (
    <div>
      {/* ผู้ประเมิน : */}
      {status !== "44" && <div>
        เอกสารจากผู้ประเมิน {user}:
        <br></br>
        <br></br>
        {
          status === "22" ? <Quizbox nameShow={nameShow} doc_id={id} name={name} status={status} text={text} setQuiz_name={setQuiz_name}
            setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body} /> :

            status === "55" ? <Quizbox nameShow={nameShow} doc_id={id} name={name} status={status} text={text} setQuiz_name={setQuiz_name}
            setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body} /> :
            
            status === "00" ? <Accpetstatus nameShow={nameShow} doc_id={id} name={name} status={status} text={text} setQuiz_name={setQuiz_name}
              setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={body} /> :
              status === "11" ?
                <div>
                  {nameShow} :
                  <button className='btn-quiz' >รอการแก้ไขเอกสารการประเมิน</button>
                </div> :
                status === "33" &&
                <div>
                  {nameShow} :
                  <button className='btn-quiz' >ส่งเอกสารการประเมินเรียบร้อย</button>
                </div>
        }
      </div>}
    </div>
  )
}

export default Checkmodekpi