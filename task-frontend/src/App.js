import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizbuild from "./pages/Quizbuild";
import Showquiz from "./pages/Showquiz";
import Navbar from "./components/Navbar";
import { linkUrl } from './urlBackend';
import axios from "axios";
import Doquiz from "./pages/Doquiz";
import Addper from "./pages/Addper";
import Score from "./pages/Score";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backnavbar from "./pages/Backnavbar";
import AddUser from "./pages/AddUser";
import ChatPage from "./pages/ChatPage";
import Testcreate from "./pages/Testcreate";
import Input_org from "./pages/Input_org";
import Input_user from "./pages/Input_user";

function App() {

  const [auth, setAuth] = useState("Login")
  const [perr, setPerr] = useState()
  const [quiz, setQuiz] = useState([])
  const [quizz, setQuizz] = useState([])
  const [quiz_name, setQuiz_name] = useState([])
  const [hench , setHench] = useState([])
  // const [permission,setPer] = useState()
  const name = localStorage.getItem("username")
  useEffect(() => {
    if (auth !== "Login") {
      setPerr(localStorage.getItem("permission"))
    }
    // console.log(quiz)
  })

  useEffect(() => {
    if (localStorage.getItem("status") === "true") {
      setAuth(localStorage.getItem("auth"))
      showassessment()
      // showQuiz()
      showHech()
    }
  }, [])

  const showQuiz = (year_) => {
    const code = localStorage.getItem("user_code")
    const sent = { user_code : code, year: year_ }
    axios.post(`${linkUrl.LinkToBackend}/show_doc`, sent).then((res) => {
      setQuiz(res.data)
      console.log(res.data)
    })
  }
  const showHech = () =>{
    const code = localStorage.getItem("user_code")
    const sent = {user_code : Number(code)}
    axios.post(`${linkUrl.LinkToBackend}/find_henchman`, sent).then((res)=>{
      console.log(res.data)
      setHench(res.data)
    })
  }

  const showassessment = () =>{
    axios.get(`${linkUrl.LinkToBackend}/show_assessment`).then((res) => {
      console.log(res.data)
      for (const i in res.data)
      {
        var temp = res.data[i].am_year
        console.log(temp)
        showQuiz(temp)
      }
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
              <Route path='/' element={auth === "Home" ? <Home hech = {hench} /> : auth === "Login" && <Login login={onAuth} />} />
              <Route path='/quiz' element={
                auth === "showbox" ? <Showquiz quiz={quiz}
                  setQuizz={setQuizz} setQuiz_name={setQuiz_name} setAuth={setAuth} /> :
                  auth === "doing" && <Doquiz name={quiz_name} quiz={quizz} />
              } />
              <Route path="/createkpi" element={<Testcreate/>}/>
              <Route path="/uploadorg" element={<Input_org/>}/>
              <Route path="/insert_user" element={<Input_user/>} />
            </Routes>
            </div>
            {/* <Backnavbar /> */}
          
        </div>
      </Router>
    </div>
  )
}

export default App;
