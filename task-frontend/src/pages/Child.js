import React, { useEffect, useState } from 'react'
import Showchild from './Showchild'
import St_child from './St_child'

const Child = ({text , setscore}) => {

  const [scoreNow , setScorenow] = useState([])

  var all_mt_weight = 0
  useEffect(()=>{
    text.mt_suptopic.map((res)=>{
      all_mt_weight = all_mt_weight + res.st_weight
      let temp = {st_name : res.st_name , st_score : 0 , st_weight : res.st_weight , st_supdetail : []}
      scoreNow.push(temp)
    })
    console.log("st :",all_mt_weight)
  },[])

  const tempchild = () =>{
    let tempAll = 0
    // console.log(scoreNow);
    scoreNow.forEach(i =>{
      let temp = (i.st_score/100)*(i.st_weight/all_mt_weight)*100
      tempAll = tempAll + temp
      // console.log(temp)
    })
    setscore.forEach(i => {
      if(i.mt_name === text.mt_name)
      {
        i.mt_score = tempAll
        i.mt_suptopic = scoreNow
      }

    })
  }

  return (
    <div>
        <div >
          {text.mt_name}
          
          {text.mt_suptopic.map((res)=>(
            <St_child text_st={res}  setNewScore={scoreNow} tempchild={tempchild}/>
            ))}
          {/* <button onClick={tempfun}>TESTOF</button> */}
            {/* {<Showchild text={text} score={score}/>} */}
        </div>
    </div>
  )
}

export default Child