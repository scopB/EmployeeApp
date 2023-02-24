import React from 'react'

const Accpetstatus = ({doc_id,name , status ,text , setQuiz_name , setQuizz , setAuth , setDocid}) => {

    const onChange = () =>{
        // console.log(status)
        // console.log(text)
        setAuth("Accept")
        setQuizz(text)
        setQuiz_name(name)
        setDocid(doc_id)
    }

  return (
    <div>
        Accpetstatus
        <button className='btn-quiz' onClick={onChange} >{name}</button>
    </div>
  )
}

export default Accpetstatus