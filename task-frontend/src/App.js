import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizbuild from "./pages/Quizbuild";
import Showquiz from "./pages/Showquiz";
import Navbar from "./components/Navbar";
import { linkUrl } from './urlBackend';
import axios from "axios";

function App() {

  const [auth, setAuth] = useState("Login")
  const [perr, setPerr] = useState()
  const [quiz,setQuiz] = useState([])
  // const [permission,setPer] = useState()

  useEffect(() => {
    if(auth !== "Login")
    {
      setPerr(localStorage.getItem("permission"))
    }    
    console.log(quiz)
  })

  useEffect(()=>{
    if (localStorage.getItem("status") === "true") {
      setAuth(localStorage.getItem("auth"))
      showQuiz()
    }
  },[])

  const showQuiz = () => {
    const sent = {permission: localStorage.getItem("permission")}
    axios.post(`${linkUrl.LinkToBackend}/showquiz`,sent).then((res)=>{
      setQuiz(res.data)
    })
  }

  const onAuth = () => {
    console.log(auth)
    localStorage.setItem("auth","Home")
    setAuth("Home")
  }
  const Logout = () => {
    console.log(auth)
    localStorage.clear()
    setAuth("Login")
  }

  return (
    <div>
      {auth === "Login" ? <Login login={onAuth} />:<Navbar logout={Logout} setAuth={setAuth} 
      permission={perr} showQuiz={showQuiz}/>}
      {auth === "b_quiz" && <Quizbuild setAuth={setAuth}/>}
      {auth === "showbox" && <Showquiz  quiz={quiz}/>}
      {auth === "Home" && <Home />}
      
    </div>
  )
}

export default App;
