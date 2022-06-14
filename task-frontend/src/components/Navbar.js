import React, { useEffect } from 'react'
const Navbar = ({ logout, setAuth, permission, showQuiz }) => {

    useEffect(() => {
        // console.log("TEST")
        showQuiz()
    }, [])

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
        window.location.href = '/result'
        localStorage.setItem("auth", "score")
        setAuth("score")
    }

    return (
        <div>
            <div className='navbar-con'>
                <ul>
                    <button className='navbar-box' onClick={onHome}>Home</button>
                    <button className='navbar-box' onClick={onShow}>You Quiz</button>
                    {permission === "admin" && <button className='navbar-box' onClick={onCreate}>New Quiz</button>}
                    {permission === "admin" && <button className='navbar-box' onClick={onPer}>Add Permission</button>}
                    {permission === "admin" && <button className='navbar-box' onClick={onScore}>Show Score</button>}
                    <button className='navbar-box2 ' onClick={onOut} href="/">Logout</button>
                </ul>
            </div>
        </div>
    )
}

export default Navbar