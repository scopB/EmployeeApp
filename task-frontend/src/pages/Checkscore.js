import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';

const Checkscore = ({maintopic , setMode , setQuizz , setQuizbody , setAuth ,setScore_}) => {


  const [name,setName] = useState('')

  useEffect(()=>{
    axios.get(`${linkUrl.LinkToBackend}/find_user/${maintopic.doc_foruserid}`).then((res)=>{
      let temp = res.data.ps_name + " " + res.data.ps_lastname
      setName(temp)
    })
  })

    // console.log(maintopic);

    //setQuizz = main topic
    //setQuizbody = all body
    const handleKpi = async() =>{
      let sent = {year : maintopic.doc_year , user_code : maintopic.doc_foruserid}
      // console.log(sent);
      let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent)
      let all_body_list = res.data
      let main = []
      let all_body 
      all_body_list.map((i)=>{
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
    <div>
      ตรวจสอบผลการประเมินตนเอง
      <br></br>
      ชื่อเอกสารแบบประเมิน : {maintopic.doc_year}
      <br></br>
      ผลคะแนนรวม : {maintopic.doc_score}
      <br></br>
      <br></br>
      {maintopic.maintopics.map((i)=>(
        <div>
          ชื่อหัวข้อดัชนีชี้วัด : {i.mt_name} " "
          <br></br>
          คะแนนรวมหัวข้อดัชนีชี้วัด : {i.mt_score}
          <br></br>
          {i.mt_suptopic.map((j)=>(
            <div>
              ชื่อดัชนีชี้วัดหลัก : {j.st_name} " "
              <br></br>
              ผลคะแนน ดัชนีชี้วัดหลัก : {j.st_score}
              <br></br>
              {j.st_supdetail.map((k)=>(
                <div>
                  ชื่อดัชนีชี้วัดย่อย : {k.sd_name} " "
                  ตัวเลือกที่เลือก : {k.sd_choice} " "
                  ผลคะแนนดัชนีชี้วัดย่อย : {k.score} " "
                  เหตุผลที่เลือก : {k.sd_detail}
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