import React from 'react'

const Showchild = ({text}) => {
  return (
    <div className={`task ${''}`}>
        {text.text}
        <form className='quiz-form'>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language"/>
            <label>5</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language"/>
            <label>4</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language"/>
            <label>3</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language"/>
            <label>2</label>
          </div>
          <div className='quiz-ans'>
            <input type="radio" name="fav_language"/>
            <label>1</label>
          </div>
        </form>
    </div>
  )
}

export default Showchild