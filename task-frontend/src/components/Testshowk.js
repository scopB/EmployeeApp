import axios from "axios"
import { useState } from "react";
import { linkUrl } from '../urlBackend';

const Testshowk = ({ nameYear,hech, ass_year, status, setAuth, setMaintopic, hech_id, setScoreCheck, mode, setCreate , time }) => {

  // console.log("huh");

  let tempId = ""
  // const [mode , setMode]  = useState("0")

  const handleedit = async () => {
    let temp = { year: ass_year, user_code: hech_id }
    // console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, temp)
    setMaintopic(res.data)
    setAuth("Edit")
  }

  const handleCheck = async () => {
    status.map((i) => {
      if (i.doc_year === ass_year) {
        tempId = i.doc_id
      }
    })
    // console.log(tempId);
    let temp = { year: ass_year, doc_id: tempId }
    // console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_score`, temp)
    // console.log(res.data);
    setScoreCheck(res.data)
    // setMaintopic(res.data)
    setAuth("Checkscore")
  }

  const onCreate = () => {
    let temp = { name : nameYear , year: ass_year, id: hech_id, hech: hech , time : time }
    setCreate(temp)
    setAuth("b_quiz")
  }



  return (
    <div>
      <h5>{nameYear} :</h5>
      {status.length > 0 && (
        status.map((i) => {
          if (i.doc_year === ass_year) {
            // console.log(i.doc_year);
            if (i.status === "00") {
              mode = "รอผลการตอบรับเอกสารการประเมิน"
            }
            else if (i.status === "--") {
              mode = "เอกสารการประเมินยังไม่ได้รับการบันทึก"
            }
            else if (i.status === "11") {
              mode = "เอกสารการประเมินถูกปฏิเสธ"
            }
            else if (i.status === "22") {
              mode = "รอการประเมินตนเอง"
            }
            else if (i.status === "33") {
              mode = "เอกสารการประเมินตนเองเสร็จสิ้น"
            }
            else if (i.status === "44") {
              mode = "สิ้นสุดการประเมิน"
            }
          }

        }))}
      <div>
        สถานะ : {mode}
        <div>
          {mode === "เอกสารการประเมินถูกปฏิเสธ" && <button onClick={handleedit}>แก้ไขเอกสารข้อตกลง</button>}
          {mode === "เอกสารการประเมินยังไม่ได้รับการบันทึก" && <button onClick={handleedit}>แก้ไขเอกสารข้อตกลง</button>}
          {mode === "เอกสารการประเมินตนเองเสร็จสิ้น" && <button onClick={handleCheck}>ตรวจสอบผลการประเมินตนเองของ {hech}</button>}
          {mode === "ไม่มีเอกสารการประเมิน" && <button onClick={onCreate}>สร้างเอกสารแบบประเมิน</button>}
        </div>

      </div>
      {/* {mode} */}
      <br></br>

    </div>
  )
}

export default Testshowk
