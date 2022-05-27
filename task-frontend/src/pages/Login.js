import React, { useState } from 'react'
import axios from 'axios'
import { linkUrl } from '../urlBackend';

const Login = ({ login }) => {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()


  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ username, password })
    axios.post(`${linkUrl.LinkToBackend}/login`, { username, password }).then((res) => {
      console.log(res)
      if (res.data.result === true) {
        localStorage.setItem("status",true)
        localStorage.setItem("username",username)
        localStorage.setItem("permission",res.data.permission)
        login()
      }
    })
  }
  return (
    <div className='login-form'>
      <img className='pig-logo' src='https://vrm.pt.co.th/static/media/logo_header.be0eb1bb.png'></img>
      <form>
        <label>Username</label>
        <input type="text" placeholder='Username' value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <div className='box-login'>
          <label>Password</label>
          <input type="password" placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input className='login-btn' onClick={onSubmit} type="submit" value='Login' />
      </form>
    </div >
  )
}

export default Login