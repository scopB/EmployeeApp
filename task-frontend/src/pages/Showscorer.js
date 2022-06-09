import React from 'react'
import './showsty.css'
const Showscorer = ({ data_body }) => {
    return (
        <div>
            {data_body.map((e) => {
                return (
                    <div className='conner'>
                        <h2>{e.username}</h2>
                        <div className='scorebox'>
                        {e.result.map((a) =>{
                            var x = ""
                            if((a.score === 1))
                            {
                                x = 'red'
                            }
                            if((a.score === 2))
                            {
                                x = 'orange'
                            }
                            if((a.score === 3))
                            {
                                x = 'yellow'
                            }
                            if((a.score === 4))
                            {
                                x = 'lightgreen'
                            }
                            if((a.score === 5))
                            {
                                x = 'green'
                            }
                            // console.log(x)
                            
                            return(
                                <div className={'littlebox ' + x}>
                                    {a.number_quiz} : {a.score}
                                </div>
                            )
                        })}
                    </div>
                    </div>
                )

            })}
        </div>
    )
}

export default Showscorer