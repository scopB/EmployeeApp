import React, { useState } from 'react'
import './showsty.css'


const Searchbox = ({setData}) => {
    const [quizname,setQuizname] = useState()
    const [username,setUsername] = useState()
    const [ore,setOre] = useState()

    const onSend = (e) =>{
        e.preventDefault()
        if(!quizname && !username)
        {
            alert('input Searchbox')
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
    <div >
        <form onSubmit={onSend} className='s-conner'>
        <input className='w-1-box' type="text" placeholder='kpi year' onChange={(e) => setQuizname(e.target.value)}/>
        <input className='w-1-box' type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
        <input className='w-1-box' type="text" placeholder='organizational' onChange={(e) => setOre(e.target.value)}/>
        <input className='w-2-buttom' type="submit" value="search" />
        </form>
    </div>
  )
}

export default Searchbox