import React, { useState } from 'react'
import { useEffect } from 'react'
import Showchild from './Showchild'

const St_child = ({ text_st , setNewScore ,tempchild, mode ,score_test , indexM , indexS}) => {
  const [scoreNow, setScorenow] = useState([])

  var all_sp_weight = 0
  // var scoreNow = []

  useEffect(() => {
    text_st.st_supdetail.map((res) => {
      all_sp_weight = all_sp_weight + res.weight
      let temp = { sd_name: res.sd_name, score: 0, weight: res.weight , sd_choice : "" ,sd_detail : ""}
      scoreNow.push(temp)
    })
    // console.log("sp :", all_sp_weight)
  }, [])

  const tempfun = () => {
    // console.log(scoreNow)
    var temp_all = 0
    scoreNow.forEach(i => {
      var temp = (i.score / 5) * (i.weight / all_sp_weight) * 100
      temp_all = temp_all + temp
      // console.log(i);
    })

    setNewScore.forEach(i => {
      if (i.st_name === text_st.st_name) {
        i.st_score = Math.ceil(temp_all)
        i.st_supdetail = scoreNow
      }
    })
    tempchild();
  }

  return (
    <div>
      ดัชนีตัวชี้วัดหลักที่ {indexM+1}.{indexS+1} : {text_st.st_name}
      {mode === "1" && <div>
        คะแนนจากการประเมินตนเองของดัชนีชี้วัดหลัก {text_st.st_name} : {score_test.st_score}
      </div>}
      {text_st.st_supdetail.map((res,index) => (
        <div>
          {mode === "0" && <Showchild text={res}  setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} indexM={indexM} indexS={indexS}/>}
          {mode === "1" && <Showchild text={res}  setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} score_test={score_test.st_supdetail[index]} indexM={indexM} indexS={indexS}/>}
        </div>
      ))}
      {/* <button onClick={tempfun}>TEST</button> */}
    </div>
  )
}

export default St_child