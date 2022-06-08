import axios from 'axios'
import React, { useState } from 'react'
import Searchbox from './Searchbox'
import { linkUrl } from '../urlBackend';
import Showscorer from './Showscorer';

const Score = () => {
    const [data_body,setData_body] = useState([])
    // const [sendData,setSendData] = useState()

    function get_search(sendData)
    {
        axios.post(`${linkUrl.LinkToBackend}/search_score`,sendData).then((res)=>{
            console.log(res.data)
            setData_body(res.data)
        })
    }

    const setData = (quiz,user) =>{
        // console.log(quiz,user)
        if(quiz == null)
        {
            const data = {username : user}
            get_search(data)
            // console.log(sendData)
        }
        else if(user == null)
        {
            const data = {quiz_name : quiz}
            get_search(data)
            // console.log(sendData)
            
        }
        else 
        {
            const data = {quiz_name : quiz,username : user}
            get_search(data)
            // console.log(sendData)
        }        
    }

  return (
    <div>
        <Searchbox setData={setData}/>
        <Showscorer data_body={data_body}/>
    </div>
  )
}

export default Score