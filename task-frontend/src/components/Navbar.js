import React, { useEffect, useState } from 'react'
import Switch from './Switch'
import './Switch.css';
const Navbar = ({ logout, setAuth, permission, showQuiz, name , ps}) => {

    const [per , setPer] = useState();

    useEffect(()=>{
        let temp = localStorage.getItem("permission")
        setPer(temp)
    })

    const onHome = () => {
        window.location.href = '/'
        localStorage.setItem("auth", "Home")
        setAuth("Home")
    }
    const onCreatekpiper = () => {
        window.location.href = '/createkpipage'
        localStorage.setItem("auth", "b_quiz")
        setAuth("b_quiz")
    }
    const onOut = () => {
        window.location.href = '/'
        logout()
    }

    const onScore = () => {
        window.location.href = '/score'
        localStorage.setItem("auth", "score")
        setAuth("score")
    }
    const onAss = () => {
        window.location.href = '/assessment'
        localStorage.setItem("auth", "assessment")
        setAuth("assessment")
    }

    const onCreatekpi = () => {
        window.location.href = '/createkpi'
        localStorage.setItem("auth", "createkpi")
        setAuth("createkpi")
    }

    const onOrg = () => {
        window.location.href = '/uploadorg'
        localStorage.setItem("auth", "createorg")
        setAuth("createorg")
    }

    const onUser = () => {
        window.location.href = '/insert_user'
        localStorage.setItem("auth", "insert_user")
        setAuth("insert_user")
    }
    const onDeny = () => {
        window.location.href = '/denydoc'
        localStorage.setItem("auth", "denydoc")
        setAuth("denydoc")
    }

    const onDetail = () => {
        window.location.href = '/doc_detail'
        localStorage.setItem("auth", "doc_detail")
        setAuth("doc_detail")
    }

   

    return (
        <div>
            <div className='navbar-con'>
                <ul>
                    {per !== "ADMINZ" && <button className='navbar-box' onClick={onHome}>Home</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onCreatekpi}>createkpi</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onOrg}>ORG MM</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onUser}>USER MM</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onAss}>Ass</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onDeny}>Deny</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onDetail}>all Detail</button>}
                    {<button className='navbar-box' onClick={onScore}>Show Score</button>}
                    {<button className='navbar-box2 ' onClick={onOut} href="/">Logout {name}</button>}

                </ul>
            </div>
        </div>
    )
}

export default Navbar