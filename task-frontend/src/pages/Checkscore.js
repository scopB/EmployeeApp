import axios from 'axios';
import React from 'react'
import { linkUrl } from '../urlBackend';

const Checkscore = ({maintopic , setMode , setQuizz , setQuizbody , setAuth}) => {
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
      setQuizbody(all_body)
      setMode("1")
      setAuth("doing")

    }

  return (
    <div>
      Checkscore
      Name : {maintopic.doc_year}
      Result Score : {maintopic.doc_score}
      {maintopic.maintopics.map((i)=>(
        <div>
          Main topic Name : {i.mt_name} " "
          Main topic Score : {i.mt_score}
          {i.mt_suptopic.map((j)=>(
            <div>
              Sup topic Name : {j.st_name} " "
              Sup topic Score : {j.st_score}
              {j.st_supdetail.map((k)=>(
                <div>
                  SubDetail Name : {k.sd_name} " "
                  SubDetail Choice : {k.sd_choice} " "
                  SubDetail Score : {k.score} 
                  {/* <br>a</br> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleKpi}>Do this kpi</button>
    </div>
  )
}

export default Checkscore