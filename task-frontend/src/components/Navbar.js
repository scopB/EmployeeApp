import axios from 'axios';
import { linkUrl } from '../urlBackend';
import React, { useEffect, useState } from 'react'
const Navbar = ({ logout, setAuth, permission, showQuiz, name , ps,code_}) => {

    const [per , setPer] = useState();
    const [realname , setRealname] = useState()

    useEffect(()=>{
        let temp = localStorage.getItem("permission")
        setPer(temp)
        axios.get(`${linkUrl.LinkToBackend}/find_user/${code_}`).then((res)=>{
            setRealname(res.data.ps_name);

        })
        
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
                    {per !== "ADMINZ" && <button className='navbar-box' onClick={onHome}>หน้าแรก</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onCreatekpi}>สร้างการประเมิน</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onOrg}>เพิ่มหน่วยงาน</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onUser}>เพิ่มผู้ใช้งาน</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onAss}>การประเมิน</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onDeny}>ประวัติการปฏิเสธตัวชี้วัด</button>}
                    {per === "ADMINZ" && <button className='navbar-box' onClick={onDetail}>รายละเอียดการประเมิน</button>}
                    {<button className='navbar-box' onClick={onScore}>ผลการประเมิน</button>}
                    {<button className='navbar-box2 ' onClick={onOut} href="/">Logout {realname}</button>}

                </ul>
            </div>
        </div>
    )
}

export default Navbar