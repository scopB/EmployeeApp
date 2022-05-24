import React from 'react'
import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [id,setId] = useState()
    const [text , setText] = useState('')
    
    
    const onSubmit = (e) =>{
        e.preventDefault()
        if(!text){
            alert('Plase add text')
            return 
        }
        onAdd({text})
        setId()
        setText('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>QUIZ</label>
                <input type="text" placeholder='Add QUIZ' 
                value={text} onChange={(e)=> setText(e.target.value)}/>
            </div>
            <input type="submit" value='Save Task' className='btn btn-block'/>
        </form>
        

    )
}

export default AddTask