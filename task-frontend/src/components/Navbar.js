import React, { useEffect } from 'react'
const Navbar = ({logout,setAuth,permission}) => {

    const onHome = () => {
        setAuth("Home")
    }
    const onCreate = () => {
        setAuth("b_quiz")
    }
    const onOut = () => {
        logout()
    }
    
    return (
        <div className='navbar-con'>
            <ul>
                <li className='navbar-box'><a href="#Home" onClick={onHome}>Home</a></li>
                 { permission === "admin" && <li className='navbar-box'><a href="#quiz_create" onClick={onCreate}>New Quiz</a></li>}
                <li className='navbar-box'><a href="#your_quiz">You Quiz</a></li>
                <li className='navbar-box'><a href="#logout" onClick={onOut}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Navbar