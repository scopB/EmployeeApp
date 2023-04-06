import React, { useEffect, useState } from 'react'
import Showchild from './Showchild'
import St_child from './St_child'

const Child = ({ save , quizbody, all_weight_, onScore, text, setscore, mode, score_test, indexM }) => {

  const [scoreNow, setScorenow] = useState([])
  const [score_, setScore_] = useState(0)
  const [testweight, setTestweight] = useState(0)
  const [all_weight, setAll_weight] = useState(0)

  // console.log(score_test);
  // console.log(all_weight_);
  // console.log(text);
  var all_mt_weight = 0

  // console.log(save);
  // useEffect(()=>{
  //   console.log(save);
  // },[save])


  async function setWeight() {
    // console.log(all_weight_);
    setTestweight(100 * text.mt_weight / all_weight_)
    // console.log(testweight);
  }

  useEffect(() => {
    text.mt_suptopic.map((res) => {
      all_mt_weight = all_mt_weight + res.st_weight
      let temp = { st_name: res.st_name, st_score: 0, st_weight: res.st_weight, st_supdetail: [] }
      scoreNow.push(temp)
    })
    setAll_weight(all_mt_weight)
  }, [])

  useEffect(() => {
    setWeight()
  })

  const tempchild = () => {
    let tempAll = 0
    scoreNow.forEach(i => {
      let temp = (i.st_score / 100) * (i.st_weight / all_weight) * 100
      tempAll = tempAll + temp
    })
    setscore.forEach(i => {
      if (i.mt_name === text.mt_name) {
        i.mt_score = Math.ceil(tempAll)
        setScore_(i.mt_score * i.mt_weight / all_weight_)
        // setTestweight(100*text.mt_weight/all_weight_)  
        i.mt_suptopic = scoreNow
      }
    })
    onScore();
  }

  return (
    <div>
      <div className='main-quiz-body'>
        <div className='point-main'>
          <h4>วัตถุประสงค์ที่ {indexM + 1} : {text.mt_name}</h4>
          <div className='point-box'>
            คะแนนวัตถุประสงค์ : {Math.ceil(score_)}
          </div>
          
        </div>
        {/* <br></br> */}
        
        {mode === "1" && <div>
          คะแนนจากการประเมินตนเองของผู้รับการประเมิน  : {score_test.mt_score * score_test.mt_weight / all_weight_} 
        </div>}
        {
          <div>
          {quizbody.st_statuskpi !== "55" && quizbody.st_statuskpi !== "66" && text.mt_suptopic.map((res,index)=>(
            <div>
              {mode === "0" && <St_child quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} indexM={indexM} indexS={index} />}
              {mode === "1" && <St_child quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} score_test={score_test.mt_suptopic[index]} indexM={indexM} indexS={index} />}
            </div>
            ))}
            {quizbody.st_statuskpi === "55" && text.mt_suptopic.map((res,index)=>(
            <div>
              {mode === "0" && <St_child save={save?.mt_suptopic[index]} quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} indexM={indexM} indexS={index} />}
              {mode === "1" && <St_child save={save?.mt_suptopic[index]} quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} score_test={score_test.mt_suptopic[index]} indexM={indexM} indexS={index} />}
            </div>
            ))}
            {quizbody.st_statuskpi === "66" && text.mt_suptopic.map((res,index)=>(
            <div>
              {mode === "0" && <St_child save={save?.mt_suptopic[index]} quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} indexM={indexM} indexS={index} />}
              {mode === "1" && <St_child save={save?.mt_suptopic[index]} quizbody={quizbody} all_weight_st={all_weight} testweight={testweight} text_st={res} setNewScore={scoreNow} tempchild={tempchild} mode={mode} score_test={score_test.mt_suptopic[index]} indexM={indexM} indexS={index} />}
            </div>
            ))}
          </div>
        }
        {/* <button onClick={tempfun}>TESTOF</button> */}
        {/* {<Showchild text={text} score={score}/>} */}
      </div>
    </div>
  )
}

export default Child