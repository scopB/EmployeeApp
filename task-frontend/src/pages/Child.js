import React, { useEffect, useState } from 'react'
import Showchild from './Showchild'
import St_child from './St_child'

const Child = ({text , setscore}) => {

  const [scoreNow , setScorenow] = useState([])

  var all_mt_weight = 0
  useEffect(()=>{
    text.mt_suptopic.map((res)=>{
      all_mt_weight = all_mt_weight + res.st_weight
      let temp = {stname : res.st_name , st_score : 0 , st_weight : res.st_weight}
      scoreNow.push(temp)
    })
    console.log("st :",all_mt_weight)
  },[])

  const tempfun = () =>{
    let tempAll = 0
    console.log(scoreNow);
    scoreNow.forEach(i =>{
      let temp = (i.st_score/100)*(i.st_weight/all_mt_weight)*100
      tempAll = tempAll + temp
      // console.log(temp)
    })
    setscore.forEach(i => {
      if(i.nametop === text.mt_name)
      {
        i.score = tempAll
      }
    })
  }

  return (
    <div>
        <div >
          {text.mt_name}
          
          {text.mt_suptopic.map((res)=>(
            <St_child text_st={res}  setNewScore={scoreNow}/>
            ))}
          <button onClick={tempfun}>TESTOF</button>
            {/* {<Showchild text={text} score={score}/>} */}
        </div>
    </div>
  )
}

export default Child