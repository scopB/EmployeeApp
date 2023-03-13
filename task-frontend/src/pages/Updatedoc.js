import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Adddoc from '../components/Adddoc';
import { linkUrl } from '../urlBackend';

const Updatedoc = ({ maintopic }) => {

  const [topics, setTopics] = useState(
    [{
      mt_name: '', mt_weight: '', mt_suptopic:
        [{
          st_name: '', st_weight: '', st_supdetail:
            [{ sd_name: '', weight: '', sd_choice01: '', sd_choice02: '', sd_choice03: '', sd_choice04: '', sd_choice05: '' }]
        }]
    }]);

  const [year, setYear] = useState('')
  const [docid, setDocid] = useState('')
  const [text, setText] = useState('')
  const [status , setStatus] = useState('')
  const now = new Date();


  useEffect(() => {
    maintopic.map((i) => {
      // console.log(i);
      setTopics(i.doc_maintopic)
      setYear(i.doc_year)
      setText(i.doc_denyDetail)
      setDocid(i.doc_id)
      setStatus(i.st_statuskpi)
    })
  }, [])

  const handleSubmit = () => {
    let time = Math.floor(now.getTime() / 1000)
    let temp = { doc_code: docid, year: year, doc_maintopic: topics, status: "00" , last_see : time}
    axios.post(`${linkUrl.LinkToBackend}/update_doc`, temp).then((res) => {
      // console.log(res);
      window.location.reload(false);
    })
  }

  const handleSave = () => {
    let time = Math.floor(now.getTime() / 1000)
    let temp = { doc_code: docid, year: year, doc_maintopic: topics, status: "--" , last_see : time }
    axios.post(`${linkUrl.LinkToBackend}/update_doc`, temp).then((res) => {
      // console.log(res);
      window.location.reload(false);
    })
  }

  // console.log(maintopic);
  return (
    <div>
      <h3>แก้ไขเอกสารการประเมิน</h3>
      {status !== "--" && <div>
        เหตุผลของการปฏิเสธเอกสารแบบประเมิน
        {text !== '' ? <div>
          {text}
        </div> : <div>
          ' ไม่ระบุเหตุผล '
        </div>}
      </div>}
      <Adddoc topics={topics} setTopics={setTopics} />
      <br></br>
      <div className='btn-add-doc'>
        <button className='btn-doc' onClick={handleSave}>บันทึกเอกสาร</button>
        <button onClick={handleSubmit}>ส่งเอกสารการประเมิน</button>
      </div>
    </div>
  )
}

export default Updatedoc