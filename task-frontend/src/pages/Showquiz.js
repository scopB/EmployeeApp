import { useEffect } from "react";
import Checkmodekpi from "../components/Checkmodekpi";
import Quizbox from "./Quizbox"

const Showquiz = ({quiz , setQuizz ,setQuiz_name, setAuth, setDocid ,setQuizbody}) => {
  

  return (
    
    <div className="container_home_kpi">
      ผู้ประเมิน :
      {quiz.length > 0 ? quiz.map((i)=>(
        i.map((quizz) => (
          <Checkmodekpi id={quizz.doc_id} name={quizz.doc_year} nameShow={quizz.doc_name} status = {quizz.st_statuskpi} text={quizz.doc_maintopic} setQuiz_name={setQuiz_name} 
      setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid} setQuizbody={setQuizbody} body={quizz}/>
        ))
      )): 
      <div>
        ' ไม่มีเอกสารการประเมิน '
      </div>} 
    </div>
  )
}

export default Showquiz