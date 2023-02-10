import React, { useEffect } from 'react'
import Showchild from './Showchild'
import St_child from './St_child'

const Child = ({text , setscore}) => {
  var all_mt_weight = 0
  useEffect(()=>{
    text.mt_suptopic.map((res)=>{
      all_mt_weight = all_mt_weight + res.st_weight
    })
    console.log("st :",all_mt_weight)
  },[])

  return (
    <div>
        <div >
          {text.mt_name}
          {text.mt_suptopic.map((res)=>(
            <St_child text_st={res} setscore ={setscore}/>
            ))}
            {/* {<Showchild text={text} score={score}/>} */}
        </div>
    </div>
  )
}

export default Child