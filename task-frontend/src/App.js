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


function App() {

  const [auth, setAuth] = useState("Login")
  const [perr, setPerr] = useState()
  const [quiz, setQuiz] = useState([])
  const [quizz, setQuizz] = useState([])
  const [quiz_name, setQuiz_name] = useState([])
  // const [permission,setPer] = useState()

  useEffect(() => {
    if (auth !== "Login") {
      setPerr(localStorage.getItem("permission"))
    }
    // console.log(quiz)
  })

  useEffect(() => {
    if (localStorage.getItem("status") === "true") {
      setAuth(localStorage.getItem("auth"))
      showQuiz()
    }
  }, [])

  const showQuiz = () => {
    const per = localStorage.getItem("permission")
    const name = localStorage.getItem("username")
    const sent = { username: name, permission: per }
    axios.post(`${linkUrl.LinkToBackend}/showquiz`, sent).then((res) => {
      setQuiz(res.data)
    })
  }

  const onAuth = () => {
    // console.log(auth)
    localStorage.setItem("auth", "Home")
    setAuth("Home")
  }
  const Logout = () => {
    // console.log(auth)
    localStorage.clear()
    setAuth("Login")
  }

  return (

    <div>
      <Router>
        <div>
          {/* //       <Routes> */}
          {/* //         <Route path='/' element={<Home />} /> */}
          {/* //       </Routes> */} 
          {auth !== "Login" &&  <Navbar logout={Logout} setAuth={setAuth}
            permission={perr} showQuiz={showQuiz} />}
          <Routes>          
          <Route path='/' element={auth === "Home" ? <Home />: auth === "Login" && <Login login={onAuth} />} />
          
          <Route path='/create-quiz' element={auth === "b_quiz" && <Quizbuild setAuth={setAuth} />}/>
          <Route path='/quiz' element={
          auth === "showbox" ? <Showquiz quiz={quiz} 
          setQuizz={setQuizz} setQuiz_name={setQuiz_name} setAuth={setAuth} />:
          auth === "doing" && <Doquiz name={quiz_name} quiz={quizz} />
          }/>
          <Route path='/permission' element={auth === "addper" && <Addper />}/>
          <Route path='/result' element={auth === "score" && <Score />}/>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
