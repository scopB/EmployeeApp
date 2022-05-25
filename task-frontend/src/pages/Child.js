import React from 'react'
import Showchild from './Showchild'

const Child = ({ onToggle,text}) => {
  return (
    <div>
        <div >
            {onToggle && <Showchild text={text} />}
        </div>
    </div>
  )
}

export default Child