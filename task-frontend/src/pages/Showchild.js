import React, { useEffect } from 'react'

const Showchild = ({ text, setScorenow, tempfun, index, mode, score_test , indexM, indexS }) => {

  // console.log(score_test);
  // console.log(mode);

  const handleScore = (e) => {
    setScorenow.forEach(i => {
      // console.log(i)
      if (i.sd_name === text.sd_name) {
        i.score = Math.ceil(Number(e.target.value))
        i.sd_choice = e.target.id
      }
    });
    tempfun();
  }

  const handleDetail = (e) => {
    setScorenow.forEach(i => {
      // console.log(i)
      if (i.sd_name === text.sd_name) {
        i.sd_detail = e.target.value
      }
    });
  }

  return (
    <div className={`task ${''}`}>
      ดัชนีตัวชี้วัดย่อยที่ {indexM+1}.{indexS+1}.{index + 1 + ". "}
      {text.sd_name}
      <div>
        คำอธิบาย :
        {text.sd_detail !== '' ?
          <div>
            {text.sd_detail}
          </div> : <div>
            ' ไม่มีคำอธิบาย '
          </div>}
      </div>
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
        {mode === "0" && <div className='quiz-ans'>
          <label>เหตุผล</label>
          <input type="text" name="KPI" onChange={handleDetail} />
        </div>}
        <div>
          { mode === "1" &&
            <div>
              ผู้ประเมินตอบ : {score_test.sd_choice} ได้ : {score_test.score} คะแนน
              <br></br>
              เหตุผล : {score_test.sd_detail}
            </div>}
        </div>
      </form>
    </div>
  )
}

export default Showchild