import React, { useState } from 'react'
import Q2 from './Q2';
import Q3 from './Q3';
import Q1 from './Q1';
import axios from 'axios';
import { linkUrl } from '../urlBackend';
import Navbar from '../components/Navbar';

const Quizbuild = ({logout,setAuth}) => {

    const [state, setState] = useState("A");
    const [quiz, setQuiz] = useState();

    const changeState = () => {
        if (state === "A") {
            setState("B")
        }
        if (state === "B") {
            setState("C")
        }
        if (state === "C") {
            setState("A")
        }
    }

    const addQuiz = (data) => {
        if(state === "A"){
            setQuiz({data})
        }
        if(state === "B"){
            const newQuiz = {BUILD:quiz.data,QUIZ_DETAIL:data.tasks}
            setQuiz(newQuiz)
        }
        if(state === "C"){
            onSubmit(quiz)
        }
        // console.log(quiz)
    }

    const onSubmit = (data) =>{
        console.log(data)
        axios.post(`${linkUrl.LinkToBackend}/insert_quiz`,data).then((res)=>{
            console.log(res)
        })
    }


    return (
        <div>
            <Navbar logout={logout} setAuth={setAuth}/>
            {state === "A" ? <Q1 changeState={changeState} addquizs={addQuiz}/> : state === "B" ?
                <Q2 changeState={changeState} addquizs={addQuiz}/> :
                <Q3 changeState={changeState} addquizs={addQuiz}/>}
        </div>
    )
}

export default Quizbuild