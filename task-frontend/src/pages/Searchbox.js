import React, { useState } from 'react'

const Searchbox = ({setData}) => {
    const [quizname,setQuizname] = useState()
    const [username,setUsername] = useState()

    const onSend = (e) =>{
        e.preventDefault()
        if(!quizname && !username)
        {
            alert('input !!!')
            return
        }
        if (!quizname) 
        {
            setData(null,username)
        }
        else if(!username)
        {
            setData(quizname,null)
        }
        else
        {
            setData(quizname,username)
        }

    }

  return (
    <div>
        <form onSubmit={onSend}>
        <input type="text" placeholder='quizname' onChange={(e) => setQuizname(e.target.value)}/>
        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
        <input type="submit" value="search" />
        </form>
    </div>
  )
}

export default Searchbox