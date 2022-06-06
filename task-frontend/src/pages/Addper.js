// import axios from 'axios';
import React, { useState } from 'react'
import Setper from '../components/Setper';
import Uppermiss from '../components/Uppermiss'
// import { linkUrl } from '../urlBackend';

const Addper = () => {
    const [permission, setPermission] = useState()
    const [henchman, setHenchman] = useState([])
    const [boss, setBoss] = useState([])
    const [point, setPoint] = useState("A")
    const [onToggle , setToggle] = useState("-true")

    const changePoint = () =>{
        setPoint("A")
        setToggle("-true")
    }
    const changePoint2 = () =>{
        setPoint("B")
        setToggle("-false")
    }
    

    return (
        <div className='container2'>
            <button className={'btn-per' + onToggle} onClick={changePoint}>Set Permission</button>
            <button className={'btn-per2' + onToggle} onClick={changePoint2}>Update Permission</button>
            {point === "A" && <Setper permission={permission} henchman={henchman} 
            boss={boss} setPermission={setPermission} setHenchman={setHenchman} 
            setBoss={setBoss}/>}
            {point === "B" && <Uppermiss/>}
        </div>
    )
}

export default Addper