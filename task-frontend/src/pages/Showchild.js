import React, { useEffect } from 'react'

const Showchild = ({ text, setscore, setScorenow }) => {

  const handleScore = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className={`task ${''}`}>
      {text.sd_name}
      <form className='quiz-form'>
        <div className='quiz-ans'>
          <input type="radio" name="Choice1" value="1" onChange={handleScore} />
          <label>{text.sd_choice01}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="Choice2" value="2" onChange={handleScore} />
          <label>{text.sd_choice02}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="Choice3" value="3" onChange={handleScore} />
          <label>{text.sd_choice03}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="Choice4" value="4" onChange={handleScore} />
          <label>{text.sd_choice04}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="Choice5" value="5" onChange={handleScore} />
          <label>{text.sd_choice05}</label>
        </div>
      </form>
    </div>
  )
}

export default Showchild