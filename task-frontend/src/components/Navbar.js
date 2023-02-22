import React, { useEffect } from 'react'
const Navbar = ({ logout, setAuth, permission, showQuiz ,name}) => {
    // console.log(name)
    // useEffect(() => {
    //     // console.log("TEST")
    //     showQuiz()
    // }, [])
    
    const onHome = () => {
        window.location.href = '/'
        localStorage.setItem("auth", "Home")
        setAuth("Home")
    }
    
    const onCreate = () => {
        window.location.href = '/create-quiz'
        localStorage.setItem("auth", "b_quiz")
        setAuth("b_quiz")
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
    const onShow = () => {
        window.location.href = '/quiz'
        localStorage.setItem("auth", "showbox")
        setAuth("showbox")
    }

    const onPer = () => {
        window.location.href = '/permission'
        localStorage.setItem("auth", "addper")
        setAuth("addper")
    }

    const onScore = () => {
        window.location.href = '/score'
        localStorage.setItem("auth", "score")
        setAuth("score")
    }

    const addUser = () =>{
        window.location.href = '/addUser'
        localStorage.setItem("auth", "addUser")
        setAuth("addUser")
    }
    const onCreatekpi = () =>{
        window.location.href = '/createkpi'
        localStorage.setItem("auth","createkpi")
        setAuth("createkpi")
    }

    const onOrg = () =>{
        window.location.href = '/uploadorg'
        localStorage.setItem("auth","createorg")
        setAuth("createorg")
    }

    const onUser = () =>{
        window.location.href = '/insert_user'
        localStorage.setItem("auth","insert_user")
        setAuth("insert_user")
    }

    return (
        <div>
            <div className='navbar-con'>
                <ul>
                    <button className='navbar-box' onClick={onHome}>Home</button>
                    {/* <button className='navbar-box' onClick={onShow}>kpi document</button> */}
                    <button className='navbar-box' onClick={onCreatekpiper}>createperkpi</button>
                    <button className='navbar-box' onClick={onCreatekpi}>createkpi</button>
                    <button className='navbar-box' onClick={onOrg}>ORG MM</button>
                    <button className='navbar-box' onClick={onUser}>USER MM</button>
                    <button className='navbar-box' onClick={onScore}>Show Score</button>
                    {permission === "admin" && <button className='navbar-box' onClick={onCreate}>New Quiz</button>}
                    {permission === "admin" && <button className='navbar-box' onClick={onPer}>Add Permission</button>}
                    {permission === "admin" && <button className='navbar-box' onClick={onScore}>Show Score</button>}
                    {permission === "admin" && <button className='navbar-box' onClick={addUser}>Add User</button>}
                    <button className='navbar-box2 ' onClick={onOut} href="/">Logout {name}</button>
                </ul>
            </div>
        </div>
    )
}

export default Navbar