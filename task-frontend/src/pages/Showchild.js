import React from 'react'

const Showchild = ({text , setscore}) => {
//   const set1 = () =>{
//       score.forEach(e => {
//         if(e.number_quiz === text.text)
//         {
//           e.score = 5
//         }
//       });
//   }
//   const set2 = () =>{
//     score.forEach(e => {
//       if(e.number_quiz === text.text)
//       {
//         e.score = 4
//       }
//     });
// }
// const set3 = () =>{
//   score.forEach(e => {
//     if(e.number_quiz === text.text)
//     {
//       e.score = 3
//     }
//   });
// }
// const set4 = () =>{
//   score.forEach(e => {
//     if(e.number_quiz === text.text)
//     {
//       e.score = 2
//     }
//   });
// }
// const set5 = () =>{
//   score.forEach(e => {
//     if(e.number_quiz === text.text)
//     {
//       e.score = 1
//     }
//   });
// }
  return (
    <div className={`task ${''}`}>
        {text.sd_name}
        <form className='quiz-form'>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" />
            <label>{text.sd_choice01}</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" />
            <label>{text.sd_choice02}</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" />
            <label>{text.sd_choice03}</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" />
            <label>{text.sd_choice04}</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language" />
            <label>{text.sd_choice05}</label>
          </div>
        </form>
    </div>
  )
}

export default Showchild