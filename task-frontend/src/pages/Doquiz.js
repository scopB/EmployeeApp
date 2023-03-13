import axios from 'axios'
import React, { useState } from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';
import { useEffect } from 'react';

const Doquiz = ({ name, quiz, quizbody, mode, score_ }) => {

  // console.log(quizbody);

  const [score, setScore] = useState(0)
  const [tempscore, settempScore] = useState([])
  const [save,setSave] = useState({maintopics : [{
    mt_name: '', mt_weight: 0,mt_score:0, mt_suptopic:
      [{
        st_name: '', st_weight: '', st_score : 0,st_supdetail:
          [{ sd_name: '', weight: '', sd_choice : "",sd_detail : "" , score : 0 }]
      }]
  }]})
  const [all_weight_, setAll_weight] = useState(0)
  const now = new Date();
  var all_weight = 0


  useEffect(() => {
    quiz.map((res) => {
      // all_weight = all_weight + res.mt_weight
      let temp = { mt_name: res.mt_name, mt_score: 0, mt_weight: res.mt_weight, mt_suptopic: [] }
      tempscore.push(temp)
    })

  }, [])

  useEffect(() => {
    get_()
    test()
  })

  // console.log(save);

  async function test() {
    quiz.map((res) => {
      all_weight = all_weight + res.mt_weight
    })
    setAll_weight(all_weight)
  }

  async function get_()
  {
    let temp = { year: quizbody.doc_year , doc_id: quizbody.doc_id , mode : 113 }
    if(mode === "1")
    {
      temp.mode = 114
    }
    // console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_score`, temp)
    // console.log(res.data);
    setSave(res.data)
  }

  const onScore = () => {
    let tempAll = 0
    tempscore.forEach(i => {
      let temp = (i.mt_score / 100) * (i.mt_weight / all_weight_) * 100
      tempAll = tempAll + temp
    })
    if (Math.ceil(tempAll) > 100) {
      tempAll = 100
    }
    setScore(tempAll)
  }

  const onSave = () => {
    let tempAll = 0
    tempscore.forEach(i => {
      let temp = (i.mt_score / 100) * (i.mt_weight / all_weight_) * 100
      tempAll = tempAll + temp
    })
    // console.log(tempAll);
    // setScore(tempAll)
    if (Math.ceil(tempAll) > 100) {
      tempAll = 100
    }
    let result = {
      doc_year: quizbody.doc_year,
      doc_name: quizbody.doc_name,
      doc_id: quizbody.doc_id,
      doc_yeartime: quizbody.doc_yeartime,
      doc_createbyid: quizbody.doc_createbyid,
      doc_foruserid: quizbody.doc_foruserid,
      doc_mode_id: 113,
      doc_score: Math.ceil(tempAll),
      maintopics: tempscore
    }
    console.log(result);
    let time = Math.floor(now.getTime() / 1000)
    if (mode === "0") {
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "55", last_see: time }
      // console.log(temp);
      axios.post(`${linkUrl.LinkToBackend}/insert_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
    else {
      result.doc_mode_id = 114
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "66", last_see: time }
      // console.log(temp);
      axios.post(`${linkUrl.LinkToBackend}/update_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
  }


  const onChick_2 = () => {
    let tempAll = 0
    tempscore.forEach(i => {
      let temp = (i.mt_score / 100) * (i.mt_weight / all_weight_) * 100
      tempAll = tempAll + temp
    })
    if (Math.ceil(tempAll) > 100) {
      tempAll = 100
    }

    let result = {
      doc_year: quizbody.doc_year,
      doc_name: quizbody.doc_name,
      doc_id: quizbody.doc_id,
      doc_yeartime: quizbody.doc_yeartime,
      doc_createbyid: quizbody.doc_createbyid,
      doc_foruserid: quizbody.doc_foruserid,
      doc_mode_id: 111,
      doc_score: Math.ceil(tempAll),
      maintopics: tempscore
    }

    console.log(result);
    if (mode === "0") {
      let time = Math.floor(now.getTime() / 1000)
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "33", last_see: time }
      axios.post(`${linkUrl.LinkToBackend}/update_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
    else if (mode === "1") {
      let time = Math.floor(now.getTime() / 1000)
      result.doc_mode_id = 112
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "44", last_see: time }
      axios.post(`${linkUrl.LinkToBackend}/update_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
  }

  const onChick = () => {
    let tempAll = 0
    tempscore.forEach(i => {
      let temp = (i.mt_score / 100) * (i.mt_weight / all_weight_) * 100
      tempAll = tempAll + temp
    })
    if (Math.ceil(tempAll) > 100) {
      tempAll = 100
    }

    let result = {
      doc_year: quizbody.doc_year,
      doc_name: quizbody.doc_name,
      doc_id: quizbody.doc_id,
      doc_yeartime: quizbody.doc_yeartime,
      doc_createbyid: quizbody.doc_createbyid,
      doc_foruserid: quizbody.doc_foruserid,
      doc_mode_id: 111,
      doc_score: Math.ceil(tempAll),
      maintopics: tempscore
    }

    console.log(result);
    if (mode === "0") {
      let time = Math.floor(now.getTime() / 1000)
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "33", last_see: time }
      axios.post(`${linkUrl.LinkToBackend}/insert_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
    else if (mode === "1") {
      let time = Math.floor(now.getTime() / 1000)
      result.doc_mode_id = 112
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "44", last_see: time }
      axios.post(`${linkUrl.LinkToBackend}/update_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          window.location.reload(false);
        })
      })
    }
  }

  return (
    <div className='all-quiz-body'>

      <h3>ชื่อเอกสาร : {quizbody.doc_name}</h3>
      คะแนนรวม = {Math.ceil(score)}
      <br></br>
      <br></br>

      {
        quizbody.st_statuskpi !== "55" && quizbody.st_statuskpi !== "66" && <div>
          {quiz.map((res, index) => (
            <div>
              {mode === "0" && <Child quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={[]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
              {mode === "1" && <Child quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={score_[index]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
            </div>
          ))}
        </div>
      }

      {
        quizbody.st_statuskpi === "55" && 
        <div>
           {quiz.map((res, index) => (
            <div>
              {mode === "0" && <Child save={save.maintopics[index]} quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={[]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
              {mode === "1" && <Child save={save.maintopics[index]} quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={score_[index]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
            </div>
          ))}
        </div>
      }
      {
        quizbody.st_statuskpi === "66" && 
        <div>
           {quiz.map((res, index) => (
            <div>
              {mode === "0" && <Child save={save.maintopics[index]} quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={[]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
              {mode === "1" && <Child save={save.maintopics[index]} quizbody={quizbody} all_weight_={all_weight_} onScore={onScore} score_test={score_[index]} text={res} setscore={tempscore} mode={mode} indexM={index} />}
            </div>
          ))}
        </div>
      }
      <button className='btn-quiz-submit' onClick={onSave}>บันทึกเอกสารแบบประเมิน</button>
      {quizbody.st_statuskpi !== "55" && quizbody.st_statuskpi !== "66" && <button className='btn-quiz-submit' onClick={onChick}>ส่งเอกสารแบบประเมิน</button>}
      {quizbody.st_statuskpi === "55" && <button className='btn-quiz-submit' onClick={onChick_2}>ส่งเอกสารแบบประเมิน</button>}
      {quizbody.st_statuskpi === "66" && <button className='btn-quiz-submit' onClick={onChick_2}>ส่งเอกสารแบบประเมิน</button>}
    </div>
  )
}

export default Doquiz