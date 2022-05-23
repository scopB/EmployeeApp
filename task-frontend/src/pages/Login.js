import React, { useState } from 'react'
import axios from 'axios'
import { linkUrl } from '../urlBackend';

const Login = ({ login }) => {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()


  const onSubmit = (e) => {
    e.preventDefault()
    console.log({username,password})
    console.log(linkUrl.LinkToBackend)
    login()
  }
  return (
    <div className='login-form'>
      <form>
        <label>Username</label>
        <input type="text" placeholder='Username' value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" placeholder='Password' value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <input onClick={onSubmit} type="submit" value='Save Task' />
      </form>
    </div >
  )
}

export default Login