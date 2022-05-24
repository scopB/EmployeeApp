import React, { useEffect, useState } from 'react'
import Q2 from './Q2';
import Q3 from './Q3';
import Q1 from './Q1';

const Quizbuild = () => {

    const [state, setState] = useState("A");
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        console.log(quiz)
    })

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
        console.log(data)
        setQuiz([...quiz,data])
        console.log(quiz)
        onSubmit(data)
    }

    const onSubmit = (data) =>{
        console.log(data)
    }


    return (
        <div>
            {state === "A" ? <Q1 changeState={changeState} addquizs={addQuiz}/> : state === "B" ?
                <Q2 changeState={changeState} addquizs={addQuiz}/> :
                <Q3 changeState={changeState} addquizs={addQuiz}/>}
        </div>
    )
}

export default Quizbuild