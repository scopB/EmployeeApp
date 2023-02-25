import React, { useState } from "react"
import Hech from "../components/Hech"
import Showquiz from "./Showquiz"

const Home = ({ hech, assessment, quiz, setAuth ,setQuizz ,setQuiz_name , setDocid , setMaintopic , setQuizbody}) => {

  // console.log(quiz);
  return (
    <div>
      <div>
        You Huchman Kpi
        {hech.length > 0 ? hech.map((i) => (
          <Hech hech={i.ps_name} assessment={assessment} hech_id = {i.ps_id} setAuth={setAuth} setMaintopic={setMaintopic}/>
        )) :
          <div>
            No huchman
          </div>
        }
      </div>
      <div>
        My KPI
        <Showquiz quiz={quiz} setQuizz={setQuizz} setQuiz_name={setQuiz_name} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody}/>
      </div>
    </div>
  )
}

export default Home