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
    
    return (
        <div className='navbar-con'>
            <ul>
                <li className='navbar-box'><a href="#index" onClick={onHome}>Home</a></li>
                <li className='navbar-box'><a href="#your_quiz" onClick={onShow}>You Quiz</a></li>
                 { permission === "admin" && <li className='navbar-box'><a href="#quiz_create" onClick={onCreate}>New Quiz</a></li>}
                <li className='navbar-box2'><a href="/" onClick={onOut}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Navbar