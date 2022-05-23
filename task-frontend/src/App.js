import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  const [auth,setAuth] = useState(false)


  const onAuth = () => {
    console.log(auth)
    setAuth(!auth)
  }

  return(
  <>
    {auth ? <Home/>:<Login login={onAuth}/>}
    {/* <Home /> */}
  </>
  );
}

export default App;
