import { useState } from "react";
import Login from "./pages/Login";
import Quizbuild from "./pages/Quizbuild";

function App() {

  const [auth,setAuth] = useState(true)


  const onAuth = () => {
    console.log(auth)
    setAuth(!auth)
  }
  
  switch(auth)
  {
    case true :
      return <Login login={onAuth}/>
    case false :
      return <Quizbuild />
  }    
}

export default App;
