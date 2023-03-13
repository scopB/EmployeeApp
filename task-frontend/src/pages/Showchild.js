import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';

const Showchild = ({ save , quizbody , all_weight_sd, testweight_, text, setScorenow, tempfun, index, mode, score_test, indexM, indexS }) => {

  
  // console.log(score_test);
  // console.log(save);
  // console.log(mode);

  // console.log(text);


  // console.log(quizbody);

  const [score, setScore] = useState(0)
  const [check , setCheck] = useState(0)
  const [text_ar,setText_ar] = useState("")
  const [test,setTest] = useState(false)

  useEffect(()=>{
    tempfun()
  })

  useEffect(()=>{
    // console.log(save?.score);
    if(save?.score && test === false)
    {
      setTest(true)
      if(quizbody.st_statuskpi === "55" | quizbody.st_statuskpi === "66")
    {
        setText_ar(save?.sd_detail)
        setCheck(save?.score)
        setScorenow.forEach(i => {
          if (i.sd_name === text.sd_name) {
            i.score = Math.ceil(Number(save?.score))
            i.sd_detail = save?.sd_detail
            i.sd_choice = save?.sd_choice
          }
        });
        tempfun();
        setScore((Math.ceil(Number(save?.score)) / 100) * (text.weight / all_weight_sd) * testweight_)
      // }
    }
    }
    
  },[save,test])

  

  const handleScore = (e) => {
    setCheck(Number(e.target.value))
    setScorenow.forEach(i => {
      // console.log(i)
      if (i.sd_name === text.sd_name) {
        i.score = Math.ceil(Number(e.target.value))
        // setScore((i.score/100)*(i.weight/all_weight_sd)*testweight_)
        i.sd_choice = e.target.id
      }
    });
    tempfun();
    setScore((Math.ceil(Number(e.target.value)) / 100) * (text.weight / all_weight_sd) * testweight_)
    // console.log(testweight_);


  }

  const handleDetail = (e) => {
    setText_ar(e.target.value)
    setScorenow.forEach(i => {
      // console.log(i)
      if (i.sd_name === text.sd_name) {
        i.sd_detail = e.target.value
      }
    });
  }

  return (
    <div className={`task ${''}`}>
      ดัชนีตัวชี้วัดรองที่ {indexM + 1}.{indexS + 1}.{index + 1 + ". "}
      <br></br>
      <h4>{text.sd_name}</h4>
      <div className='quiz-detail'>
        คำอธิบาย :
        {text.sd_detail !== '' ?
          <div>
            {text.sd_detail}
          </div> : <div>
            ' ไม่มีคำอธิบาย '
          </div>}
      </div>
      <div>
        คะแนน = {Math.ceil(score)}
      </div>

      {mode === "0" && 
      
      <form className='quiz-form'>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="20" id={text.sd_choice01} checked={check === 20}  onChange={handleScore} />
          <label>1. {text.sd_choice01}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="40" id={text.sd_choice02}  checked={check === 40} onChange={handleScore} />
          <label>2. {text.sd_choice02}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="60" id={text.sd_choice03}  checked={check === 60} onChange={handleScore} />
          <label>3. {text.sd_choice03}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="80" id={text.sd_choice04}  checked={check === 80} onChange={handleScore} />
          <label>4. {text.sd_choice04}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="100" id={text.sd_choice05}  checked={check === 100} onChange={handleScore} />
          <label>5. {text.sd_choice05}</label>
        </div>
        <div className='quiz-ans-box'>
          <h4>เหตุผล</h4>
          <br></br>
          {/* <input type="text" name="KPI" onChange={handleDetail} /> */}
          <textarea name="KPI" value={text_ar} onChange={handleDetail} rows="5"></textarea>
        </div>
      </form>}

      {mode === "1" && 
      
      <form className='quiz-form'>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="20" id={text.sd_choice01} checked={check === 20}  onChange={handleScore} />
          <label>1. {text.sd_choice01}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="40" id={text.sd_choice02} checked={check === 40}  onChange={handleScore} />
          <label>2. {text.sd_choice02}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="60" id={text.sd_choice03} checked={check === 60}  onChange={handleScore} />
          <label>3. {text.sd_choice03}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="80" id={text.sd_choice04} checked={check === 80}  onChange={handleScore} />
          <label>4. {text.sd_choice04}</label>
        </div>
        <div className='quiz-ans'>
          <input type="radio" name="KPI" value="100" id={text.sd_choice05} checked={check === 100}  onChange={handleScore} />
          <label>5. {text.sd_choice05}</label>
        </div>
        <div>
          <div>
            ผู้ประเมินตอบ : {score_test.sd_choice} ได้ : {score_test.score} คะแนน
            <br></br>
            เหตุผล : {score_test.sd_detail}
          </div>
        </div>
      </form>}

    </div>
  )
}

export default Showchild