import axios from "axios"
import { linkUrl } from '../urlBackend';

const Testshowk = ({ ass_year, status , setAuth , setMaintopic , hech_id}) => {


  const handleedit = async() =>{
    let temp ={year : ass_year , user_code: hech_id}
    console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, temp)
    setMaintopic(res.data)
    setAuth("Edit")
  }

  return (
    <div>
      {ass_year} : 
      {status.length > 0 ? (
        status.map((i) => {
          if (i.doc_year === ass_year) {
            return (
              <>
                {i.status}
                {i.status === "11" && <button onClick={handleedit}>Edit</button>}
              </>
            );
          } else {
            return "No document";
          }
        })
      ) : (
        "No document"
      )}
    </div>
  )
}

export default Testshowk
