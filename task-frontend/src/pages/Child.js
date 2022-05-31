import React from 'react'
import Showchild from './Showchild'

const Child = ({text}) => {
  return (
    <div>
        <div >
            {<Showchild text={text} />}
        </div>
    </div>
  )
}

export default Child