import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Adddoc from '../components/Adddoc';
import { linkUrl } from '../urlBackend';
import './Crearekpi.css'; // Import CSS file

function CreateKpi({ onCreate }) {

  console.log(onCreate);


  const [topics, setTopics] = useState(
    [{
      mt_name: '', mt_weight: '', mt_suptopic:
        [{
          st_name: '', st_weight: '', st_supdetail:
            [{ sd_name: '', weight: '', sd_detail: '', sd_choice01: '', sd_choice02: '', sd_choice03: '', sd_choice04: '', sd_choice05: '' }]
        }]
    }]);
  const now = new Date();

  // console.log(assessment)  
  const handleSubmit = event => {
    event.preventDefault();
    let result = ChangeValues("00")
    // console.log(result);
    axios.post(`${linkUrl.LinkToBackend}/insert_doc`, result).then((res) => {
      console.log(res);
      if (res.data === true) {
        alert("สร้างเอกสารเสร็จสิ้น")
      }
      window.location.reload(false);
    })
  };

  const handleSave = event => {
    event.preventDefault();
    let result = ChangeValues("--")
    axios.post(`${linkUrl.LinkToBackend}/insert_doc`, result).then((res) => {
      console.log(res);
      if (res.data === true) {
        alert("บันทึกเอกสารการประเมินสำเร็จ")
      }
      window.location.reload(false);
    })
  };

  const ChangeValues = (stat) => {
    let user = localStorage.getItem("user_code")
    let time = Math.floor(now.getTime() / 1000)
    let temp = {
      doc_id: "", doc_name: onCreate.name,
      doc_year: onCreate.year, doc_yeartime: Number(onCreate.time),
      doc_createbyid: Number(user), doc_foruserid: Number(onCreate.id),
      doc_createdate: time, st_lastsee: time, st_statuskpi: stat, doc_maintopic: topics
    }
    console.log(temp);
    return temp
    // console.log(temp);
  }

  return (
    <div>
      <form>
        <div className='hearder-b-quiz'>
          ชื่อเอกสาร : {onCreate.name}
          <br></br>
          ประจำปี : {onCreate.year}
          <br></br>
          สำหรับ : {onCreate.hech}
        </div>
        <div><Adddoc topics={topics} setTopics={setTopics} />
        <div className='btn-add-doc'>
          <button className='btn-doc' onClick={handleSave}>บันทึกเอกสารแบบประเมิน</button>
          <button type="submit" onClick={handleSubmit}>ส่งเอกสารแบบประเมิน</button></div>
        </div>
        
      </form>
    </div>
  );
}

export default CreateKpi;
// This component uses the useState hook to manage the state of the KPI name, value, and isPublic data. The handleSubmit function is called when the form is submitted, and it can be used to perform an API call to create the KPI with the entered data. In this example,


