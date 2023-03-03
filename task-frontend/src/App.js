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
import Checkscore from "./pages/Checkscore";
import Editass from "./pages/Editass";
import Denypage from "./pages/Denypage";
import All_detail from "./pages/All_detail";

function App() {

  const [auth, setAuth] = useState("Login")
  const [quiz, setQuiz] = useState([])
  const [quizz, setQuizz] = useState([])
  const [quiz_name, setQuiz_name] = useState([])
  const [hench, setHench] = useState([])
  const [assessment, setAssessment] = useState([])
  const [docid, setDocid] = useState()
  const [maintopic, setMaintopic] = useState()
  const [quizbody, setQuizbody] = useState()
  const [scoreCheck, setScoreCheck] = useState()
  const [mode, setMode] = useState("0")
  const [score_, setScore_] = useState([])
  const [onCreate, setCreate] = useState()
  const [modeCreate, setModeCreate] = useState("0")
  const [CreateDetail, setCreateDetail] = useState({})
  const name = localStorage.getItem("username")
  const ps = localStorage.getItem("permission")


  useEffect(async () => {
    if (localStorage.getItem("status") === "true") {
      setAuth(localStorage.getItem("auth"))
      await showassessment()
      showHech()
    }
  }, [])

  const showQuiz = async (year_) => {
    const code = localStorage.getItem("user_code")
    const sent = { user_code: code, year: year_ }
    let res = await axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent)
    // console.log(res.data)
    return res.data
  }
  const showHech = () => {
    const code = localStorage.getItem("user_code")
    const sent = { user_code: Number(code) }
    axios.post(`${linkUrl.LinkToBackend}/find_henchman`, sent).then((res) => {
      // console.log(res.data)
      setHench(res.data)
    })
  }


  // console.log(quiz);

  const showassessment = async () => {
    await axios.get(`${linkUrl.LinkToBackend}/show_assessment`).then(async (res) => {
      // console.log(res.data)
      setAssessment(res.data)
      let temp_list = []
      for (const i in res.data) {
        var temp = res.data[i].am_year
        // console.log(temp)
        var temp_data = await showQuiz(temp)
        // console.log(temp_data);
        if (temp_data.length != 0) {
          temp_list.push(temp_data)
          // console.log(temp_data);
        }
      }
      // console.log(temp_list);
      setQuiz(temp_list)
    })
  }

  const onAuth = () => {
    if (localStorage.getItem("permission") !== "ADMINZ") {
      localStorage.setItem("auth", "Home")
      setAuth("Home")
    }
    else {
      window.location.href = '/score'
      localStorage.setItem("auth", "score")
      setAuth("score")
    }

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
            name={name} ps={ps} />}
          <div className="test-page">
            <Routes>
              <Route path='/' element={auth === "Home" ?
                <Home hech={hench} assessment={assessment}
                  quiz={quiz} setQuizz={setQuizz} setQuiz_name={setQuiz_name}
                  setAuth={setAuth} setDocid={setDocid} setMaintopic={setMaintopic}
                  setQuizbody={setQuizbody} setScoreCheck={setScoreCheck} setCreate={setCreate} /> :
                auth === "Login" ? <Login login={onAuth} /> :
                  auth === "doing" ? <Doquiz name={quiz_name} quiz={quizz} quizbody={quizbody} mode={mode} score_={score_} /> :
                    auth === "Accept" ? <Acceptkpi all={quizbody} doc_id={docid} name={quiz_name} quiz={quizz} /> :
                      auth === "Edit" ? <Updatedoc maintopic={maintopic} /> :
                        auth === "Checkscore" ? <Checkscore maintopic={scoreCheck} setMode={setMode}
                          setQuizz={setQuizz} setQuizbody={setQuizbody}
                          setAuth={setAuth} setScore_={setScore_} /> :
                          auth === "b_quiz" && <CreateKpi onCreate={onCreate} />
              } />
              {/* <Route path="/createkpipage" element={<CreateKpi hech = {hench} assessment={assessment}/>}/> */}
              <Route path="/assessment" element={
              auth === "assessment" ? <Editass setModeCreate={setModeCreate}
                setCreateDetail={setCreateDetail} assessment={assessment} setAuth={setAuth}/> :
                auth === "ass_edit" && <Testcreate modeCreate={modeCreate} CreateDetail={CreateDetail} setAuth={setAuth}/> }/>
              <Route path="/createkpi" element={<Testcreate modeCreate={modeCreate} CreateDetail={CreateDetail}/>} />
              <Route path="/uploadorg" element={<Input_org />} />
              <Route path="/doc_detail" element={<All_detail assessment={assessment}/>} />
              <Route path="/denydoc" element={<Denypage assessment={assessment} />} />
              <Route path="/insert_user" element={<Input_user />} />
              <Route path="/score" element={<Score />} />
            </Routes>
          </div>
          {/* <Backnavbar /> */}

        </div>
      </Router>
    </div>
  )
}

export default App;
