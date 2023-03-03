import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Adddoc from '../components/Adddoc';
import { linkUrl } from '../urlBackend';

const Updatedoc = ({maintopic}) => {

  const [topics, setTopics] = useState(
    [{ mt_name: '', mt_weight: '', mt_suptopic: 
    [{ st_name: '', st_weight: '', st_supdetail: 
    [{ sd_name: '', weight: '' , sd_choice01 : '',sd_choice02 : '',sd_choice03 : '',sd_choice04 : '',sd_choice05 : ''}] }] }]);

    const [year , setYear] = useState('')
    const [docid,setDocid] = useState('')
    const [text,setText] = useState('')
  
  useEffect(()=>{
    maintopic.map((i)=>{
      console.log(i);
      setTopics(i.doc_maintopic)
      setYear(i.doc_year)
      setText(i.doc_denyDetail)
      setDocid(i.doc_id)
    })
  },[])

  const handleSubmit = () =>{
    let temp = { doc_code : docid , year : year , doc_maintopic : topics , status : "00" }
    axios.post(`${linkUrl.LinkToBackend}/update_doc`, temp).then((res) => {
      console.log(res);
      window.location.reload(false);
    })
  }

  const handleSave = () =>{
    let temp = { doc_code : docid , year : year , doc_maintopic : topics , status : "--" }
    axios.post(`${linkUrl.LinkToBackend}/update_doc`, temp).then((res) => {
      console.log(res);
      window.location.reload(false);
    })
  }

  // console.log(maintopic);
  return (
    <div>
      แก้ไขเอกสารการประเมิน

      <div>
        เหตุผลของการปฏิเสธเอกสารแบบประเมิน
        {text !== '' ? <div>
          {text}
        </div> : <div>
          ' ไม่ระบุเหตุผล '
          </div>}
      </div>
      <Adddoc topics={topics} setTopics={setTopics}/>    
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSubmit}>Submit</button>  
    </div>
  )
}

export default Updatedoc