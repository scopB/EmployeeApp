import React from 'react'

const Showchild = ({text , score}) => {
  const set1 = () =>{
      score.forEach(e => {
        if(e.number_quiz === text.text)
        {
          e.score = 5
        }
      });
  }
  const set2 = () =>{
    score.forEach(e => {
      if(e.number_quiz === text.text)
      {
        e.score = 4
      }
    });
}
const set3 = () =>{
  score.forEach(e => {
    if(e.number_quiz === text.text)
    {
      e.score = 3
    }
  });
}
const set4 = () =>{
  score.forEach(e => {
    if(e.number_quiz === text.text)
    {
      e.score = 2
    }
  });
}
const set5 = () =>{
  score.forEach(e => {
    if(e.number_quiz === text.text)
    {
      e.score = 1
    }
  });
}
  return (
    <div className={`task ${''}`}>
        {text.text}
        <form className='quiz-form'>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" onChange={set1}/>
            <label>5</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" onChange={set2}/>
            <label>4</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" onChange={set3}/>
            <label>3</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" onChange={set4}/>
            <label>2</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" onChange={set5}/>
            <label>1</label>
          </div>
        </form>
    </div>
  )
}

export default Showchild