import Quizbox from "./Quizbox"

const Showquiz = ({quiz , setQuizz ,setQuiz_name, setAuth}) => {
  

  return (
    <div className="container-quiz">
      {quiz.map((quizz)=>(
        <Quizbox name={quizz.quiZ_NAME} text={quizz.inserT_BODY} setQuiz_name={setQuiz_name} 
        setQuizz={setQuizz} setAuth={setAuth}/>
      ))} 
    </div>
  )
}

export default Showquiz