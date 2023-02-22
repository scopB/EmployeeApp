import React, { useState } from "react"
import Hech from "../components/Hech"
import Showquiz from "./Showquiz"

const Home = ({ hech, assessment, quiz, setAuth ,setQuizz ,setQuiz_name}) => {

  return (
    <div>
      <div>
        You Huchman Kpi
        {hech.length > 0 ? hech.map((i) => (
          <Hech hech={i.ps_name} assessment={assessment} />
        )) :
          <div>
            No huchman
          </div>
        }
      </div>
      <div>
        My KPI
        <Showquiz quiz={quiz} setQuizz={setQuizz} setQuiz_name={setQuiz_name} setAuth={setAuth} />
      </div>
    </div>
  )
}

export default Home