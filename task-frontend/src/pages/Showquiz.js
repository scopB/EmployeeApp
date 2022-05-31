import Quizbox from "./Quizbox"

const Showquiz = ({quiz , setQuizz , setAuth}) => {
  

  return (
    <div>
      {quiz.map((quizz)=>(
        <Quizbox name={quizz.quiZ_NAME} text={quizz.inserT_BODY} setQuizz={setQuizz} setAuth={setAuth}/>
      ))} 
    </div>
  )
}

export default Showquiz