import React, { useEffect, useState } from 'react';
import Adddoc from '../components/Adddoc';

const Updatedoc = ({maintopic}) => {

  const [topics, setTopics] = useState(
    [{ mt_name: '', mt_weight: '', mt_suptopic: 
    [{ st_name: '', st_weight: '', st_supdetail: 
    [{ sd_name: '', weight: '' , sd_choice01 : '',sd_choice02 : '',sd_choice03 : '',sd_choice04 : '',sd_choice05 : ''}] }] }]);

  useEffect(()=>{
    maintopic.map((i)=>{
      setTopics(i.doc_maintopic)
    })
  },[])

  const handleSubmit = () =>{
    console.log(topics) //axios
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