import React, { useState } from 'react'
import { useEffect } from 'react'
import Showchild from './Showchild'

const St_child = ({ save, quizbody, all_weight_st, testweight, text_st, setNewScore, tempchild, mode, score_test, indexM, indexS }) => {
  const [scoreNow, setScorenow] = useState([])
  const [testweight_, setTestweight] = useState(0)

  // console.log(testweight);
  // console.log(save);

  // console.log(testweight);//คะแนนเต็ม
  // console.log("popo");

  var all_sp_weight = 0
  const [score_, setScore_] = useState(0)
  const [all_weight, setAll_weight] = useState(0)
  // var scoreNow = []

  async function setWeight() {
    setTestweight(testweight * text_st.st_weight / all_weight_st)
  }

  useEffect(() => {
    setWeight()
  })

  useEffect(() => {
    text_st.st_supdetail.map((res) => {
      all_sp_weight = all_sp_weight + res.weight
      let temp = { sd_name: res.sd_name, score: 0, weight: res.weight, sd_choice: "", sd_detail: "" }
      scoreNow.push(temp)
    })
    setAll_weight(all_sp_weight)
    // console.log("sp :", all_sp_weight)
  }, [])



  const tempfun = () => {
    var temp_all = 0
    scoreNow.forEach(i => {
      // console.log(i.weight);
      const temp = (i.score / 100) * (i.weight / all_weight) * 100
      temp_all = temp_all + temp
    })
    setNewScore.forEach(i => {
      if (i.st_name === text_st.st_name) {
        i.st_score = Math.ceil(temp_all)
        setScore_((Math.ceil(temp_all) / 100) * (i.st_weight / all_weight_st) * testweight)
        i.st_supdetail = scoreNow
      }
    })
    tempchild();
  }

  return (
    <div className='sub-quiz-body'>
      <div className='point-main'>
        <div>ตัวชี้วัดหลักที่ {indexM + 1}.{indexS + 1} :</div>
        <h4>{text_st.st_name}</h4>
        <div className='point-box'>
          คะแนนตัวชี้วัดหลัก = {Math.ceil(score_)}
        </div>

      </div>

      {mode === "1" && <div>
      {/* (Math.ceil(score_test.st_score) / 100) * (score_test.st_weight / all_weight_st) * testweight */}
        คะแนนจากการประเมินตนเองตัวชี้วัดหลัก : {Math.floor((Math.ceil(score_test.st_score) / 100) * (score_test.st_weight / all_weight_st) * testweight)}
      </div>}
      {
        quizbody.st_statuskpi !== "55" && quizbody.st_statuskpi !== "66" && <div>
          {text_st.st_supdetail.map((res, index) => (
            <div>
              {mode === "0" && <Showchild quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} indexM={indexM} indexS={indexS} />}
              {mode === "1" && <Showchild quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} score_test={score_test.st_supdetail[index]} indexM={indexM} indexS={indexS} />}
            </div>
          ))}
        </div>
      }

      {
        quizbody.st_statuskpi === "55" && <div>
          {text_st.st_supdetail.map((res, index) => (
            <div>
              {mode === "0" && <Showchild save={save?.st_supdetail[index]} quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} indexM={indexM} indexS={indexS} />}
              {mode === "1" && <Showchild save={save?.st_supdetail[index]} quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} score_test={score_test.st_supdetail[index]} indexM={indexM} indexS={indexS} />}
            </div>
          ))}
        </div>
      }
      {
        quizbody.st_statuskpi === "66" && <div>
          {text_st.st_supdetail.map((res, index) => (
            <div>
              {mode === "0" && <Showchild save={save?.st_supdetail[index]} quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} indexM={indexM} indexS={indexS} />}
              {mode === "1" && <Showchild save={save?.st_supdetail[index]} quizbody={quizbody} all_weight_sd={all_weight} testweight_={testweight_} text={res} setScorenow={scoreNow} tempfun={tempfun} index={index} mode={mode} score_test={score_test.st_supdetail[index]} indexM={indexM} indexS={indexS} />}
            </div>
          ))}
        </div>
      }
      {/* <button onClick={tempfun}>TEST</button> */}
    </div>
  )
}

export default St_child