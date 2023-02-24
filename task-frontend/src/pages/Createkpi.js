import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Adddoc from '../components/Adddoc';
import { linkUrl } from '../urlBackend';

function CreateKpi({ assessment , hech, myid }) {
  
  const [foruser , setForuser] = useState();
  const [year , setYear] = useState();
  const [text , onAdd] = useState()
  const [topics, setTopics] = useState(
    [{ mt_name: '', mt_weight: '', mt_suptopic: 
    [{ st_name: '', st_weight: '', st_supdetail: 
    [{ sd_name: '', weight: '' , sd_choice01 : '',sd_choice02 : '',sd_choice03 : '',sd_choice04 : '',sd_choice05 : ''}] }] }]);

  const options_user = []
  const options_year = []
  const now = new Date();

  // console.log(assessment)

  useEffect(()=>{
    if(options_user.length === 0) 
    {
      hech.map((i)=>{
        let temp = {value : i.ps_id , label: i.ps_name} 
        options_user.push(temp)
      })
    }
    if(options_year.length === 0) 
    {
      assessment.map((i)=>{
        let string = i.am_year + " ครั้งที่ : " + i.am_number_of_kpi
        let temp = {value : i.am_year , label: string , value2 : i.am_number_of_kpi} 
        options_year.push(temp)
      })
    }
  })

  const handleSubmit = event => {
    event.preventDefault();
    let result = ChangeValues()
    // console.log(result);
    axios.post(`${linkUrl.LinkToBackend}/insert_doc`, result).then((res)=>{
      console.log(res);
    })
  };

  const ChangeValues = () =>{
    let user = localStorage.getItem("user_code")
    let time = Math.floor(now.getTime()/1000)
    let temp = {
      doc_id : "",
      doc_year : year.value ,doc_yeartime : Number(year.value2),
      doc_createbyid : Number(user) ,doc_foruserid : foruser.value,
      doc_createdate : time, st_lastsee : 0, st_statuskpi : "00" , doc_maintopic : topics
    }
    return temp
    // console.log(temp);
  }

  return (
    <div>
      <form>
        FOR USER : 
        <Select
          defaultValue={foruser}
          onChange={setForuser}
          options={options_user}
        />
        Year of : 
        <Select
          defaultValue={year}
          onChange={setYear}
          options={options_year}
        />
        <Adddoc topics={topics} setTopics={setTopics}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default CreateKpi;
// This component uses the useState hook to manage the state of the KPI name, value, and isPublic data. The handleSubmit function is called when the form is submitted, and it can be used to perform an API call to create the KPI with the entered data. In this example,


