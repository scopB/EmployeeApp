import { useEffect } from "react";
import Checkmodekpi from "../components/Checkmodekpi";
import Quizbox from "./Quizbox"

const Showquiz = ({quiz , setQuizz ,setQuiz_name, setAuth, setDocid}) => {


  // useEffect(()=>{
  // console.log(quiz);
  //     if(quiz.length > 0)
  //     {
  //       quiz.map((i)=>{
  //         i.map((j)=>{
  //             console.log(j.st_statuskpi);
  //         })
  //       })
  //     }
  // })
  

  return (
    
    <div className="container-quiz">
      {quiz.length > 0 ? quiz.map((i)=>(
        i.map((quizz) => (
          <Checkmodekpi id= {quizz.doc_id} name={quizz.doc_year} status = {quizz.st_statuskpi} text={quizz.doc_maintopic} setQuiz_name={setQuiz_name} 
      setQuizz={setQuizz} setAuth={setAuth} setDocid={setDocid}/>
        ))
      )):
      <div>
        'No Quiz show'
      </div>} 
    </div>
  )
}

export default Showquiz