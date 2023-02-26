import axios from 'axios'
import React, { useState } from 'react'
import Child from './Child'
import { linkUrl } from '../urlBackend';
import { useEffect } from 'react';

const Doquiz = ({ name, quiz, quizbody , mode}) => {
  const [score, setScore] = useState([])
  const [tempscore, settempScore] = useState([])
  var all_weight = 0


  useEffect(() => {
    console.log(quizbody);
    console.log(quiz)
    console.log(mode);

    quiz.map((res) => {
      all_weight = all_weight + res.mt_weight
      let temp = { mt_name: res.mt_name, mt_score: 0, mt_weight: res.mt_weight, mt_suptopic: [] }
      tempscore.push(temp)
    })
    console.log("mt :", all_weight)
  }, [])

  const onChick = () => {

    let tempAll = 0

    tempscore.forEach(i => {
      let temp = (i.mt_score / 100) * (i.mt_weight / all_weight) * 100
      tempAll = tempAll + temp
    })

    if(Math.ceil(tempAll) > 100)
    {
      tempAll = 100
    }

    let result = {
      doc_year: quizbody.doc_year,
      doc_id: quizbody.doc_id,
      doc_yeartime: quizbody.doc_yeartime,
      doc_createbyid: quizbody.doc_createbyid,
      doc_foruserid: quizbody.doc_foruserid,
      doc_mode_id: Number(mode),
      doc_score:Math.ceil(tempAll),
      maintopics: tempscore
    }
    // console.log(result);
    if(mode === "0")
    {

      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "33" }
    axios.post(`${linkUrl.LinkToBackend}/insert_score`, result).then((res) => {
      axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
        console.log(res);
      })
    })
    }
    else if(mode === "1")
    {
      let temp = { doc_id: quizbody.doc_id, year: quizbody.doc_year, status_update: "44" }
      console.log(result);
      axios.post(`${linkUrl.LinkToBackend}/update_score`, result).then((res) => {
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`, temp).then((res) => {
          console.log(res);
        })
      })
    }
    

    // console.log(temp);
  }

  return (
    <div>
      {quiz.map((res) => (
        <Child text={res} setscore={tempscore} />
      ))}
      <button className='btn btn-block' onClick={onChick}>Submit</button>
    </div>
  )
}

export default Doquiz