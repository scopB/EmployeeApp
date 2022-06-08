import React, { useEffect } from 'react'
const Navbar = ({logout,setAuth,permission,showQuiz}) => {

    useEffect(()=>{
        console.log("TEST")
        showQuiz()
    },[])

    const onHome = () => {
        localStorage.setItem("auth","Home")
        setAuth("Home")
    }
    const onCreate = () => {
        localStorage.setItem("auth","b_quiz")
        setAuth("b_quiz")
    }
    const onOut = () => {
        logout()
    }
    const onShow = () => {
        localStorage.setItem("auth","showbox")
        setAuth("showbox")
    }

    const onPer = () =>{
        localStorage.setItem("auth","addper")
        setAuth("addper")
    }
    
    const onScore = () =>{
        localStorage.setItem("auth","score")
        setAuth("score")
    }
    
    return (
        <div className='navbar-con'>
            <ul>
                <button className='navbar-box' href="#index" onClick={onHome}>Home</button>
                <button className='navbar-box' href="#your_quiz" onClick={onShow}>You Quiz</button>
                { permission === "admin" && <button className='navbar-box' href="#quiz_create" onClick={onCreate}>New Quiz</button>}
                { permission === "admin" && <button className='navbar-box' href="#addper" onClick={onPer}>Add Permission</button>}
                { permission === "admin" && <button className='navbar-box' href="#show" onClick={onScore}>Show Score</button> }
                <button className='navbar-box2 ' onClick={onOut} href="/">Logout</button>
            </ul>
        </div>
    )
}

export default Navbar