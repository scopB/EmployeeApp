import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Showas from './Showas'
import Testshowk from './Testshowk'
import { linkUrl } from '../urlBackend';

const Hech = ({ setNewScore,setMode, setQuizz, setQuizbody, setScore_, hech, assessment, hech_id, setAuth, setMaintopic, setScoreCheck, setCreate }) => {

  const [showAssessment, setShowassessment] = useState(false)
  const [status, setStatus] = useState([])

  let ass_year = ""
  let time = ""

  const now = new Date();
  const start_date = Math.floor(now.getTime() / 1000)
  // console.log(assessment , start_date);
  let mode = "ไม่มีเอกสารการประเมิน"
  let result = []
  let nameYear = ""
  let stu = ""

  // onHandle()

  let tempId = ""
  // const [mode , setMode]  = useState("0")

  const handleedit = async (json) => {
    let temp = { year: json.am_year, user_code: hech_id }
    console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, temp)
    setMaintopic(res.data)
    setAuth("Edit")
  }


  function check_score(json) {
    let list = []
    let result_weight = check_all_weight(json)
    json.maintopics.map((i, indexx) => {
      let new_score = i.mt_score * i.mt_weight / result_weight.weight
      let full_score_mt = 100 * i.mt_weight / result_weight.weight
      let list_temp = []
      i.mt_suptopic.map((j, indexj) => {
        let new_scorej = j.st_score * j.st_weight / result_weight.sub[indexx].indexi.weight / 100 * full_score_mt
        let full_score_st = full_score_mt * j.st_weight / result_weight.sub[indexx].indexi.weight
        let list_tempk = []
        j.st_supdetail.map((k) => {
          let new_scorek = k.score * k.weight / result_weight.sub[indexx].indexi.sub[indexj].indexj / 100 * full_score_st
          if (new_scorek % 1 >= 0.5) {
            new_scorek = Math.floor(new_scorek)
          }
          else {
            new_scorek = Math.ceil(new_scorek)
          }
          let temp = { name: k.sd_name, score: new_scorek }
          list_tempk.push(temp)
        })
        if (new_scorej % 1 >= 0.5) {
          new_scorej = Math.floor(new_scorej)
        }
        else {
          new_scorej = Math.ceil(new_scorej)
        }
        let temp = { name: j.st_name, score: new_scorej, sd: list_tempk }
        list_temp.push(temp)
      })
      if (new_score % 1 >= 0.5) {
        new_score = Math.floor(new_score)
      }
      else {
        new_score = Math.ceil(new_score)
      }
      let temp = { name: i.mt_name, score: new_score, st: list_temp }
      list.push(temp)
    })
    return list;
  }



  function check_all_weight(json) {
    let all_mt = 0
    let list = []
    json.maintopics.map((i, indexi) => {
      all_mt = all_mt + i.mt_weight
      let all_st = 0
      let st_list = []
      i.mt_suptopic.map((j, indexj) => {
        all_st = all_st + j.st_weight
        let all_sd = 0
        j.st_supdetail.map((k, indexk) => {
          all_sd = all_sd + k.weight
        })
        let temp_st = { indexj: all_sd }
        st_list.push(temp_st)
      })
      let temp = { indexi: { weight: all_st, sub: st_list } }
      list.push(temp)
    })

    let result = { weight: all_mt, sub: list }
    return result;
  }

  const handleCheck = async (json) => {
    status.map((i) => {
      if (i.doc_year === ass_year) {
        tempId = i.doc_id
      }
    })
    let temp = { year: json.am_year, doc_id: tempId , mode : 111 }
    console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_score`, temp)
    console.log(res.data);
    setScoreCheck(res.data)
    setNewScore(check_score(res.data))
    setAuth("Checkscore")
  }


  const onDoing = async (json) => {
    status.map((i) => {
      if (i.doc_year === ass_year) {
        tempId = i.doc_id
      }
    })
    let temp = { year: json.am_year, doc_id: tempId , mode : 111 }
    if(stu === "66")
    {
      temp.mode = 114
    }
    // console.log(temp);
    let res_show = await axios.post(`${linkUrl.LinkToBackend}/show_score`, temp)
    let maintopic_ = res_show.data
    console.log(maintopic_);

    let sent = {year : maintopic_.doc_year , user_code : maintopic_.doc_foruserid}
      // console.log(sent);
      let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent)
      let all_body_list = res.data
      console.log(res);
      let main = []
      let all_body 
      all_body_list.map((i)=>{
        main = i.doc_maintopic
        all_body = i
      })

      setQuizz(main)
      setScore_(maintopic_.maintopics)
      setQuizbody(all_body)
      setMode("1")
      setAuth("doing")

  }

  const onCreate = (json) => {
    // console.log(json);
    let temp = { name: json.am_name, year: json.am_year, id: hech_id, hech: hech, time: json.am_number_of_kpi }
    console.log(temp);
    setCreate(temp)
    setAuth("b_quiz")
  }

  async function test() {
    let tempyear = []
    assessment.map((i) => {
      tempyear.push(i.am_year)
    })
    let temp = { id: hech_id, year: tempyear }
    axios.post(`${linkUrl.LinkToBackend}/get_doc_from`, temp).then((res) => {
      const result = res.data;
      setStatus(result);
    });
  }

  useEffect(() => {
    test()
  }, [])

  // console.log(status);

  return (
    <div className='hm-card'>
      <h3>{hech}</h3>
      รหัสประจำตัวพนักงาน : {hech_id}
      <br></br>
      <br></br>

      <div>
        {
          <div>
            {
              assessment.length > 0 ? assessment.map((i) => (
                <div key={i.am_year}>
                  <h5>{i.am_name} : </h5>
                  {start_date > i.am_createdate & start_date < i.am_enddate &&
                    <div>
                      {status.map((j) => {
                        if (j.doc_year === i.am_year) {
                          // console.log("test");
                          // ass_year = i.am_year
                          // nameYear = i.am_name
                          // time = i.am_number_of_kpi
                          // console.log(i.doc_year);
                          if (j.status === "00") {
                            mode = "รอผลการตอบรับเอกสารการประเมิน"
                          }
                          else if (j.status === "--") {
                            mode = "เอกสารการประเมินยังไม่ได้รับการบันทึก"
                          }
                          else if (j.status === "11") {
                            mode = "เอกสารการประเมินถูกปฏิเสธ"
                          }
                          else if (j.status === "22" | j.status === "55") {
                            mode = "รอการประเมินตนเอง"
                          }
                          else if (j.status === "33") {
                            mode = "เอกสารการประเมินตนเองเสร็จสิ้น"
                            ass_year = i.am_year
                            nameYear = i.am_name
                            stu = j.status
                          }
                          else if (j.status === "66") {
                            mode = "ทำการประเมินต่อ"
                            ass_year = i.am_year
                            nameYear = i.am_name
                            stu = j.status
                          }
                          else if (j.status === "44") {
                            mode = "สิ้นสุดการประเมิน"
                          }
                        }
                      })}
                      <div>
                        สถานะ : {mode}
                      </div>
                      <div>
                        {mode === "เอกสารการประเมินถูกปฏิเสธ" && <button onClick={()=>handleedit(i)}>แก้ไขเอกสารข้อตกลง</button>}
                        {mode === "เอกสารการประเมินยังไม่ได้รับการบันทึก" && <button onClick={()=>handleedit(i)}>แก้ไขเอกสารข้อตกลง</button>}
                        {mode === "เอกสารการประเมินตนเองเสร็จสิ้น" && 
                        <div>
                          <button onClick={()=>handleCheck(i)}>ตรวจสอบผลการประเมินตนเอง</button>
                          <br></br>
                          <br></br>
                          <button onClick={()=>onDoing(i)}>เริ่มต้นการประเมิน</button>
                        </div>}
                        {mode === "ทำการประเมินต่อ" && 
                        <div>
                          <button onClick={()=>onDoing(i)}>ทำการประเมินต่อ</button>
                        </div>}
                        {mode === "ไม่มีเอกสารการประเมิน" && <button onClick={()=>onCreate(i)}>สร้างเอกสารแบบประเมิน</button>}
                      </div>
                    </div>
                  }
                  {/* {start_date > i.am_createdate & start_date < i.am_enddate && <Testshowk hech={hech} ass_year={i.am_year} nameYear={i.am_name} status={status} setAuth={setAuth} time={i.am_number_of_kpi}
                        setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck} mode={mode} setCreate={setCreate} />} */}
                </div>
              )) :
                <div>
                  ไม่มีการสร้างแบบประเมิน kpi ประจำปี
                </div>
            }
          </div>}
      </div>


      {/* {showAssessment && <Showas hech={hech} assessment={assessment} status={status} setAuth={setAuth} 
        setMaintopic={setMaintopic} hech_id={hech_id} setScoreCheck={setScoreCheck} setCreate={setCreate}/>} */}
    </div>
  )
}

export default Hech