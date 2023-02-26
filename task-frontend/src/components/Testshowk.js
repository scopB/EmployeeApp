import axios from "axios"
import { linkUrl } from '../urlBackend';

const Testshowk = ({ ass_year, status, setAuth, setMaintopic, hech_id ,setScoreCheck}) => {


  let tempId = ""

  const handleedit = async () => {
    let temp = { year: ass_year, user_code: hech_id }
    // console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, temp)
    setMaintopic(res.data)
    setAuth("Edit")
  }

  const handleCheck = async () => {
    status.map((i)=>{
      if (i.doc_year === ass_year)
      {
        tempId = i.doc_id
      }
    })
    console.log(tempId);
    let temp = { year: ass_year, doc_id: tempId }
    // console.log(temp);
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_score`, temp)
    // console.log(res.data);
    setScoreCheck(res.data)
    // setMaintopic(res.data)
    setAuth("Checkscore")
  }

  return (
    <div>
      {ass_year} :
      {status.length > 0 ? (
        status.map((i) => {
          if (i.doc_year === ass_year) {
            return (
              <>
                {i.status === "00" && "Waith for Comfirm"}              
                {i.status === "11" && "Cancel Document"}
                {i.status === "11" && <button onClick={handleedit}>Edit</button>}
                {i.status === "22" && "Wait to kpi"}
                {i.status === "33" && "Done kpi Waith for Boss"}
                {i.status === "33" && <button onClick={handleCheck}>Check KPI</button> }
                {i.status === "44" && "All Done"}
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
