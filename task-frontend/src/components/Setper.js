import Select from 'react-select';
import axios from 'axios';
import React, { useState } from 'react'
import { linkUrl } from '../urlBackend';

const Setper = ({permission,henchman,boss,setPermission,setHenchman,setBoss}) => {
    // const [permissionData,setPermissionData] = useState()

    const options = [
        { value: 'admin', label: 'ADMIN' },
        { value: 'hr', label: 'HR' },
        { value: 'dev', label: 'DEV' },
        { value: 'bi', label: 'BI' },
        { value: 'EG', label: 'EG' },
    ];
    const setPermiss = (e) =>{
        e.preventDefault()
        const h_data = []
        henchman.forEach((e) => {
            h_data.push({permission : e.value})
        })
        console.log(h_data)
        const b_data = []
        boss.forEach((e) => {
            b_data.push({permission : e.value})
        })
        console.log(b_data)
        const newPer = {main:permission.value,henchman:h_data,boss:b_data}
        console.log(newPer)
        // setPermissionData(newPer)

        axios.post(`${linkUrl.LinkToBackend}/insert_per`,newPer).then((res)=>{
            console.log(res)
            window.location.reload(false);
        })
    }
  return (
    <div >
            <form className='add-form' onSubmit={setPermiss}>
                <div className='form-control'>
                    <label>Permission</label>
                    <Select
                        defaultValue={permission}
                        onChange={setPermission}
                        options={options}
                    />
                    <label>Set Henchman</label>
                    <Select
                        isMulti
                        defaultValue={henchman}
                        onChange={setHenchman}
                        options={options}
                    />
                    <label>Set Boss</label>
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

export default Setper