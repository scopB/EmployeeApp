import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { linkUrl } from '../urlBackend';
import Select from 'react-select';

const Uppermiss = () => {
  const [permission, setPermission] = useState()
  const [modec, setModec] = useState()
  const [boss, setBoss] = useState([])

  const options = [];

  useEffect(()=>{
      if(options.length === 0)
      {
          get_data()
      }       
  })

  const get_data = ()=>{
      axios.get(`${linkUrl.LinkToBackend}/show_permission`).then((res)=>{
          res.data.map((e)=>{
              const temp = { value: e.permission, label: e.permission }
              // console.log(temp)
              options.push(temp)
          })
      })
  }
  const mode = [
    { value: 'henchman', label: 'HENCHMAN' },
    { value: 'boss', label: 'BOSS' }
  ];
  const submitfunc = (e) => {
    e.preventDefault()
    const h_data = []
        boss.forEach((e) => {
            h_data.push({permission : e.value})
        })
    if(modec.value === "henchman")
    {
      const newPer = {main:permission.value,henchman:h_data,boss:null}
      axios.post(`${linkUrl.LinkToBackend}/insert_update_H`,newPer).then((res)=>{
        console.log(res)
        window.location.reload(false);
    })
    }
    else
    {
      const newPer = {main:permission.value,henchman:null,boss:h_data}
      axios.post(`${linkUrl.LinkToBackend}/insert_update_B`,newPer).then((res)=>{
        console.log(res)
        window.location.reload(false);
    })
    }
  }

  return (
    <div >
      <form className='add-form' onSubmit={submitfunc}>
        <div className='form-control'>
          <label>Permission</label>
          <Select
            defaultValue={permission}
            onChange={setPermission}
            options={options}
          />
          <label>Set Mode</label>
          <Select
            defaultValue={modec}
            onChange={setModec}
            options={mode}
          />
          <label>Set Data</label>
          <Select
            isMulti
            defaultValue={boss}
            onChange={setBoss}
            options={options}
          />
        </div>
        <input type="submit" value='Save Permission' className='btn btn-block' />
      </form>
    </div>
  )
}

export default Uppermiss