import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { linkUrl } from './urlBackend';
import axios from "axios";
import Doquiz from "./pages/Doquiz";
import Score from "./pages/Score";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backnavbar from "./pages/Backnavbar";
import Testcreate from "./pages/Testcreate";
import Input_org from "./pages/Input_org";
import Input_user from "./pages/Input_user";
import CreateKpi from "./pages/Createkpi";
import Acceptkpi from "./pages/Acceptkpi";
import Updatedoc from "./pages/Updatedoc";

function App() {

  const [auth, setAuth] = useState("Login")
  const [perr, setPerr] = useState()
  const [quiz, setQuiz] = useState([])
  const [quizz, setQuizz] = useState([])
  const [quiz_name, setQuiz_name] = useState([])
  const [hench , setHench] = useState([])
  const [assessment , setAssessment] = useState([])
  const [docid , setDocid] = useState()
  const [maintopic , setMaintopic] = useState()
  

  

  // const [permission,setPer] = useState()
  const name = localStorage.getItem("username")
  useEffect(() => {
    if (auth !== "Login") {
      setPerr(localStorage.getItem("permission"))
    }
    // console.log(quiz)
  })

  useEffect( async() => {
    if (localStorage.getItem("status") === "true") {
      setAuth(localStorage.getItem("auth"))
      await showassessment()
      // showQuiz()
      showHech()
    }
  }, [])

  const showQuiz = async (year_) => {
    const code = localStorage.getItem("user_code")
    const sent = { user_code : code, year: year_ }
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent)
    // console.log(res.data)
    return res.data
  }
  const showHech = () =>{
    const code = localStorage.getItem("user_code")
    const sent = {user_code : Number(code)}
    axios.post(`${linkUrl.LinkToBackend}/find_henchman`, sent).then((res)=>{
      // console.log(res.data)
      setHench(res.data)
    })
  }

  // console.log(quiz);

  const showassessment = async() =>{
    await axios.get(`${linkUrl.LinkToBackend}/show_assessment`).then( async(res) => {
      // console.log(res.data)
      setAssessment(res.data)
      let temp_list = []
      for (const i in res.data)
      {
        var temp = res.data[i].am_year
        // console.log(temp)
        var temp_data = await showQuiz(temp)
        // console.log(temp_data);
        if(temp_data.length != 0)
        {
          temp_list.push(temp_data)
          // console.log(temp_data);
        }
      }
      console.log(temp_list);
      setQuiz(temp_list)
    })
  }

  const onAuth = () => {
    localStorage.setItem("auth", "Home")
    setAuth("Home")
  }
  const Logout = () => {
    localStorage.clear()
    setAuth("Login")
  }

  return (

    <div>
      <Router>
        <div >
          {auth !== "Login" && <Navbar logout={Logout} setAuth={setAuth}
            permission={perr} name={name}/>}
          <div className="test-page">
            <Routes>

              <Route path='/' element={auth === "Home" ? 
              <Home hech = {hench} assessment={assessment} 
              quiz = {quiz} setQuizz={setQuizz} setQuiz_name={setQuiz_name} 
              setAuth={setAuth} setDocid={setDocid} setMaintopic={setMaintopic}/> :
              auth === "Login" ? <Login login={onAuth} /> : 
              auth === "doing" ? <Doquiz name={quiz_name} quiz={quizz} />:
              auth === "Accept" ? <Acceptkpi doc_id={docid} name={quiz_name} quiz={quizz} /> :
              auth === "Edit" && <Updatedoc maintopic = {maintopic}/>
              } />
              <Route path="/createkpipage" element={<CreateKpi hech = {hench} assessment={assessment}/>}/>
              <Route path="/createkpi" element={<Testcreate/>}/>
              <Route path="/uploadorg" element={<Input_org/>}/>
              <Route path="/insert_user" element={<Input_user/>} />
              <Route path="/score" element={<Score/>}/>
            </Routes>
            </div>
            {/* <Backnavbar /> */}
          
        </div>
      </Router>
    </div>
  )
}

export default App;
