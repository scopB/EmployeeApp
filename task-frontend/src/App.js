import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  const [auth,setAuth] = useState(true)

  return(
  <>
    {auth ? <Home/>:<Login />}
    {/* <Home /> */}
  </>
  );
}

export default App;
