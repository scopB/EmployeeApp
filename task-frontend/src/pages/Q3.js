import React from 'react'

const Q3 = ({changeState,addquizs}) => {
  const onSubmit = () => {
    addquizs()
    changeState()
  }
  return (
    <div>
      <button onClick={onSubmit} style={{ backgroundColor: 'green'}} className='btn'>Submit form</button>
    </div>
  )
}

export default Q3