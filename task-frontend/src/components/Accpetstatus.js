import React from 'react'

const Accpetstatus = ({nameShow,doc_id,name , status ,text , setQuiz_name , setQuizz , setAuth , setDocid , setQuizbody , body}) => {

    const onChange = () =>{
        // console.log(status)
        // console.log(text)
        setAuth("Accept")
        setQuizz(text)
        setQuiz_name(name)
        setDocid(doc_id)
        setQuizbody(body)
    }

  return (
    <div>
         {nameShow} : 
        <button className='btn-quiz' onClick={onChange} >ตอบรับเอกสารการประเมิน</button>
    </div>
  )
}

export default Accpetstatus