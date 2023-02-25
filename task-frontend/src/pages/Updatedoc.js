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
  
  useEffect(()=>{
    maintopic.map((i)=>{
      setTopics(i.doc_maintopic)
      setYear(i.doc_year)
      setDocid(i.doc_id)
    })
  },[])

  const handleSubmit = () =>{
    // console.log(topics) //axios
    // console.log(year);
    // console.log(docid);
    let temp = { doc_code : docid , year : year , doc_maintopic : topics}
    axios.post(`${linkUrl.LinkToBackend}/update_doc`, temp).then((res) => {
      console.log(res);
    })
  }

  // console.log(maintopic);
  return (
    <div>
      Updatedoc
      <Adddoc topics={topics} setTopics={setTopics}/>    
      <button onClick={handleSubmit}>Check</button>  
    </div>
  )
}

export default Updatedoc