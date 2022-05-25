import Quizbox from "./Quizbox"

const Showquiz = ({quiz}) => {
  
  

  return (
    <div>
      {quiz.map((quizz)=>(
        <Quizbox name={quizz[0]} text={quizz}/>
      ))}
    </div>
  )
}

export default Showquiz