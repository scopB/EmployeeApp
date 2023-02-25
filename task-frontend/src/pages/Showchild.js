import React, { useEffect } from 'react'

const Showchild = ({ text , setScorenow ,tempfun}) => {

  const handleScore = (e) => {
    setScorenow.forEach(i => {
      // console.log(i)
        if (i.sd_name === text.sd_name)
        {
          i.score = Number(e.target.value)
          i.sd_choice = e.target.id
        }
    });
    tempfun();
  }

  return (
    <div className={`task ${''}`}>
      {text.sd_name}
      <form className='quiz-form'>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="1" id={text.sd_choice01} onChange={handleScore} />
          <label>{text.sd_choice01}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="2" id={text.sd_choice02} onChange={handleScore} />
          <label>{text.sd_choice02}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="3" id={text.sd_choice03} onChange={handleScore} />
          <label>{text.sd_choice03}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="4" id={text.sd_choice04} onChange={handleScore} />
          <label>{text.sd_choice04}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="5" id={text.sd_choice05} onChange={handleScore} />
          <label>{text.sd_choice05}</label>
        </div>
      </form>
    </div>
  )
}

export default Showchild