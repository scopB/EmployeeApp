import axios from 'axios';
import React from 'react'
import { linkUrl } from '../urlBackend';

const Acceptkpi = ({ doc_id , name, quiz }) => {

    const handleStatus = () =>{
        let temp = {doc_id: doc_id,year: name,status_update: "22"}
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`,temp).then((res)=>{
            console.log(res);
        })
    }

    const handleStatusCancel = () =>{
        let temp = {doc_id: doc_id,year: name,status_update: "11"}
        console.log(temp);
        axios.post(`${linkUrl.LinkToBackend}/update_status_doc`,temp).then((res)=>{
            console.log(res);
        })
    }

    return (
        <div>
            Name : {name}
            {quiz.map((i) => (
                <div>
                    Main topic : {i.mt_name}
                    <div>
                        {i.mt_suptopic.map((j) => (
                            <div>
                                Sup topic : {j.st_name}
                                <div>
                                    {j.st_supdetail.map((k) => (
                                        <div>{k.sd_name}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleStatus}>Submit Document</button>
            <button onClick={handleStatusCancel}>Cancel Document</button>
        </div>
    )
}

export default Acceptkpi