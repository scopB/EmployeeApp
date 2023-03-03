import React, { useState } from "react"
import Hech from "../components/Hech"
import Showquiz from "./Showquiz"

const Home = ({ hech, assessment, quiz, setAuth, setQuizz, setQuiz_name, setDocid, setMaintopic, setQuizbody, setScoreCheck ,setCreate}) => {

  // console.log(quiz);
  return (
    <div>
      <div className="container_home_hm">
        ผู้รับการประเมิน
        <div className="huchman">
          {hech.length > 0 ? hech.map((i) => (
            <Hech hech={i.ps_name + " " + i.ps_lastname} assessment={assessment} hech_id={i.ps_id} setAuth={setAuth} 
            setMaintopic={setMaintopic} setScoreCheck={setScoreCheck} setCreate={setCreate}/>
          )) :
            <div>
              ' ไม่มีผู้ให้ประเมิน '
            </div>
          }
        </div>
      </div>
      <div>
        <Showquiz quiz={quiz} setQuizz={setQuizz} setQuiz_name={setQuiz_name} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} />
      </div>
    </div>
  )
}

export default Home