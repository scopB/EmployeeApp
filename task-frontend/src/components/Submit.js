import React from 'react'
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore";

function Submit({tasks, onReset}) {

    async function fetchdata (){
        const obj = Object.assign({}, tasks);
        await addDoc(collection(db, "testfortask"), obj);
        onReset()
    }
  return (
    <button onClick={fetchdata} className='btn2'>Submit</button>
  )
}

export default Submit