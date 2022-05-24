import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizbuild from "./pages/Quizbuild";

function App() {

  const [auth, setAuth] = useState("Login")
  const [perr, setPerr] = useState()
  // const [permission,setPer] = useState()

  useEffect(() => {
    // console.log(auth)
    // console.log(localStorage.getItem("permission"))
    setPerr(localStorage.getItem("permission"))
    // console.log(perr)

  })


  const onAuth = () => {
    console.log(auth)
    setAuth("Home")
  }
  const Logout = () => {
    console.log(auth)
    localStorage.clear()
    setAuth("Login")
  }


  switch (auth) {
    case "Login":
      if(localStorage.getItem("status")==="true") {
        setAuth("Home")
      }
      return <Login login={onAuth} />
    case "Home":
      return <Home logout={Logout} setAuth={setAuth} permis={perr}/>
    case "b_quiz":
      return <Quizbuild logout={Logout} setAuth={setAuth} permis={perr}/>
    case "Login":
      return <Login />
  }
}

export default App;
