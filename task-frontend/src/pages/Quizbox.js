import React from 'react'
import { useEffect } from 'react'

const Quizbox = ({nameShow, doc_id , name , status ,text , setQuiz_name , setQuizz , setAuth, setDocid, setQuizbody , body}) => {


    const onChange = () =>{
      // console.log(body);
        // console.log(status)
        // console.log(text)
        setAuth("doing")
        setQuizz(text)
        setQuiz_name(name)
        setDocid(doc_id)
        setQuizbody(body)
    }

  return (
    <div >
       {nameShow}  :
        <button className='btn-quiz' onClick={onChange}>เริ่มการประเมินตนเอง</button>
    </div>
  )
}

export default Quizbox