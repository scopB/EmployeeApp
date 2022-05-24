import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { linkUrl } from '../urlBackend';

const Home = ({ logout, setAuth }) => {
  const [permission, setPermission] = useState()
  useEffect(() => {
    const name = { username: localStorage.getItem("username") }
    axios.post(`${linkUrl.LinkToBackend}/finduser`, name).then((res) => {
      setPermission(res.data.permission)
      // setPer(res.data.permission)
      // console.log(permission)
    })
  }, [])
  return (
    <div>
      <Navbar logout={logout} setAuth={setAuth} permission={permission} />
    </div>
  )
}

export default Home