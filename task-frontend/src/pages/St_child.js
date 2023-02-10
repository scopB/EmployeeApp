import React from 'react'
import { useEffect } from 'react'
import Showchild from './Showchild'

const St_child = ({text_st , setscore}) => {
  
  var all_sp_weight = 0
  useEffect(()=>{
    text_st.st_supdetail.map((res)=>{
      all_sp_weight = all_sp_weight + res.weight
    })
    console.log("sp :",all_sp_weight)
  },[])

  return (
    <div>
        {text_st.st_name}
        {text_st.st_supdetail.map((res)=>(
            <Showchild text={res} setscore={setscore}/>
        ))}
    </div>
  )
}

export default St_child