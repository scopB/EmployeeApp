import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';

const Checkscore = ({ newScore,maintopic, setMode, setQuizz, setQuizbody, setScore_, setAuth }) => {


  const [name, setName] = useState('')
  // const [newScore , setNewScore] = useState([])
  const [mt_weight, setMt_weight] = useState(0)
  const [st_weight, setSt_weight] = useState(0)
  const [sd_weight, setSd_weight] = useState(0)

  useEffect(() => {
    axios.get(`${linkUrl.LinkToBackend}/find_user/${maintopic.doc_foruserid}`).then((res) => {
      let temp = res.data.ps_name + " " + res.data.ps_lastname
      setName(temp)
    })
    // setNewScore(check_score(maintopic))
    // console.log(newScore);
  })

  useEffect(()=>{
    console.log(newScore);
  },[])

  

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


  // console.log(maintopic);

  //setQuizz = main topic
  //setQuizbody = all body
  const handleKpi = async () => {
    let sent = { year: maintopic.doc_year, user_code: maintopic.doc_foruserid }
    // console.log(sent);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent)
    let all_body_list = res.data
    let main = []
    let all_body
    all_body_list.map((i) => {
      main = i.doc_maintopic
      all_body = i
    })

    setQuizz(main)
    setScore_(maintopic.maintopics)
    setQuizbody(all_body)
    setMode("1")
    setAuth("doing")

  }

  return (
    <div className='body-accept'>
      <div className='box-accept-doc'>
        ตรวจสอบผลการประเมินตนเอง
        <br></br>
        ชื่อเอกสารแบบประเมิน : {maintopic.doc_year}
        <br></br>
        ผลคะแนนรวม : {maintopic.doc_score}
        <br></br>
      </div>

      {maintopic.maintopics.map((i, indexi) => (
        <div className='head-acc'>
          {indexi + 1}. วัตถุประสงค์ : {i.mt_name}
          <div className='acc-w-s'>
            คะแนนรวมวัตถุประสงค์ : {newScore[indexi].score}
          </div>

          {i.mt_suptopic.map((j, indexj) => (
            <div className='testbocy-accp'>
              {indexi + 1}.{indexj + 1}. ตัวชี้วัดหลัก : {j.st_name}
              <br></br>
              <div className='acc-w-s-2'>
                ผลคะแนน ตัวชี้วัดหลัก : {newScore[indexi].st[indexj].score}
              </div>
              {j.st_supdetail.map((k, indexk) => (
                <div className='testbocy-accp'>
                  {indexi + 1}.{indexj + 1}.{indexk + 1}. ตัวชี้วัดรอง : {k.sd_name}
                  <div className='acc-w-s-3'>
                    เกณฑ์ที่เลือก : {k.sd_choice}
                    <br></br>
                    ผลคะแนนตัวชี้วัดรอง : {newScore[indexi].st[indexj].sd[indexk].score}
                    <br></br>
                    เหตุผลที่เลือก : {k.sd_detail}
                  </div>
                  {/* <br>a</br> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleKpi}>เริ่มการประเมิน {name}</button>
    </div>
  )
}

export default Checkscore